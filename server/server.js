
const OpenAI = require('openai').default; // Adjusted for CommonJS
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config()

const app = express();
app.use(express.json()); // To parse JSON bodies
const cors = require('cors');
app.use(cors());

const PORT = 3001;

// Create an instance of OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

asst_id = "";

app.post('/generate-questions', async (req, res) => {
    const assistant = await openai.beta.assistants.create({
        name: "Question generator",
        instructions: "you generate insightful follow up questions to help learn more about the user's learning objectives given a topic and the users background. questions are returned in json",
        model: "gpt-4-1106-preview"
      });    
    asst_id = assistant.id;
    const thread = await openai.beta.threads.create();

    try {
        const { topic, background } = req.body;

        // Construct the prompt
        const prompt = `give me two follow up questions to learn more about a user that wants to learn about ${topic} and has a background of ${background}. 
        These questions should be general enough and very broad to know more about how to best tailor tutoring content for the user to teach them ${topic}. 
        ask about their related experience and how they plan on using it, but in a broad manner. the question should be small and simple.`;

        const message = await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: prompt
            }
        )

        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: assistant.id,
                instructions: "respond with a JSON in the format {'q1': 'q1', 'q2': 'q2}"
            }
        )
        
        console.log("waiting for openai response")

        while(true) {
            const ran = await openai.beta.threads.runs.retrieve(
                thread.id, run.id
            )
            if(ran.status == 'completed') {
                console.log(ran.status);
                break;
            }
        }

        const messages = await openai.beta.threads.messages.list(
            thread.id
        );

        for (const message of messages.body.data) {
            if(message.role == "assistant") {
                console.log(JSON.parse(message.content[0].text.value))
                res.json(JSON.parse(message.content[0].text.value))
                break;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    const response = await openai.beta.assistants.del(asst_id);
    console.log(response);
    process.exit(0)
})
