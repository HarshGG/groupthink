
const OpenAI = require('openai').default; // Adjusted for CommonJS
const dotenv = require('dotenv');
require('dotenv').config();
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


asst_ids = [];

app.post('/api/generate-questions', async (req, res) => {
    const assistant = await openai.beta.assistants.create({
        name: "Question generator",
        instructions: "you generate insightful follow up questions to help learn more about the user's learning objectives given a topic and the users background. questions are returned in json",
        model: "gpt-4-1106-preview"
      });    
    asst_ids.push(assistant.id);
    const thread = await openai.beta.threads.create();

    try {
        const { topic, background } = req.body;

        // Construct the prompt
        const prompt = `give me two follow up questions to learn more about a user that wants to learn about ${topic} and has a background of ${background}. 
        These questions should be general enough and very broad to know more about how to best tailor tutoring content for the user to teach them ${topic}. 
        ask about their related experience and how they plan on using it, but in a broad manner. the question should be small and simple.`;
        console.log(prompt)
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
                console.log(JSON.parse((message.content[0].text.value).replace(/```json\n|\n```|\n/g, '')))
                res.json(JSON.parse((message.content[0].text.value).replace(/```json\n|\n```|\n/g, '')))
                break;
            }
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Get YouTube links
app.get('/api/youtubelinks', async (req, res) => {
  var useRealData = true;

  const searchPrompt = req.query.prompt;

  const apiKey = 'AIzaSyDp29FG3nd8fyuu_CL2m1OfokMkQldz7-0';

  const apiUrl = 'https://youtube.googleapis.com/youtube/v3/search';

  var data;

  const params = {
    part: 'snippet',
    maxResults: 5,
    q: searchPrompt,
    type: 'video',
    key: apiKey,
  };

  const headers = {
    //Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };

  if (useRealData) {
    await axios.get(apiUrl, { params, headers })
      .then(response => {
        // Store the response data in a variable
        data = response.data;
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error.message);
      });
    console.log(data.items[0]);
    data = data.items;
  }
  // use dummy data
  else {
    data = [{
      kind: 'youtube#searchResult',
      etag: '3DfIlanwP9T9RmJcrgiZlMysa24',
      id: { kind: 'youtube#video', videoId: 'rN0TREj8G7U' },
      snippet: {
        publishedAt: '2016-12-25T20:03:17Z',
        channelId: 'UCh9nVJoWXmFb7sLApWGcLPQ',
        title: 'numpy tutorial - introduction | numpy array vs python list',
        description: "This tutorial covers an introduction to numpy python module. We'll see why numpy is very popular and talk about its main feature ...",
        thumbnails: [Object],
        channelTitle: 'codebasics',
        liveBroadcastContent: 'none',
        publishTime: '2016-12-25T20:03:17Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'uZUs0w3Ac7kPmKoNkA-S0nEsx3E',
      id: { kind: 'youtube#video', videoId: '_d_Ka-ks2a0' },
      snippet: {
        publishedAt: '2016-12-28T00:04:42Z',
        channelId: 'UCh9nVJoWXmFb7sLApWGcLPQ',
        title: 'numpy tutorial - slicing/stacking arrays, indexing with boolean arrays',
        description: 'This tutorial covers numpy array operations such as slicing, indexing, stacking. We will also go over how to index one array with ...',
        thumbnails: [Object],
        channelTitle: 'codebasics',
        liveBroadcastContent: 'none',
        publishTime: '2016-12-28T00:04:42Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: '-WDuMzR8o-1ARnvd6ulYYiMNn2Y',
      id: { kind: 'youtube#video', videoId: 'ZB7BZMhfPgk' },
      snippet: {
        publishedAt: '2019-07-11T23:52:34Z',
        channelId: 'UCkhm72fuzkS9fYGlGpEmj7A',
        title: 'Introduction to Numerical Computing with NumPy | SciPy 2019 Tutorial | Alex Chabot-Leclerc',
        description: 'NumPy provides Python with a powerful array processing library and an elegant syntax that is well suited to expressing ...',
        thumbnails: [Object],
        channelTitle: 'Enthought',
        liveBroadcastContent: 'none',
        publishTime: '2019-07-11T23:52:34Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'PCM-S09z7TsTMrr_5Qb3qECXRQY',
      id: { kind: 'youtube#video', videoId: 'DI8wg3SRV90' },
      snippet: {
        publishedAt: '2019-08-21T14:54:23Z',
        channelId: 'UCCktnahuRFYIBtNnKT5IYyg',
        title: 'Numpy Tutorial | Python Numpy Tutorial | Intellipaat',
        description: 'Intellipaat Python training course: https://intellipaat.com/python-for-data-science-training/ Read complete Python tutorial here: ...',
        thumbnails: [Object],
        channelTitle: 'Intellipaat',
        liveBroadcastContent: 'none',
        publishTime: '2019-08-21T14:54:23Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'Zyx2hmQGUZlEE-IBpxpG5M8vozc',
      id: { kind: 'youtube#video', videoId: 'r-uOLxNrNk8' },
      snippet: {
        publishedAt: '2020-04-15T13:19:55Z',
        channelId: 'UC8butISFwT-Wl7EV0hUK0BQ',
        title: 'Data Analysis with Python - Full Course for Beginners (Numpy, Pandas, Matplotlib, Seaborn)',
        description: 'Learn Data Analysis with Python in this comprehensive tutorial for beginners, with exercises included! NOTE: Check description ...',
        thumbnails: [Object],
        channelTitle: 'freeCodeCamp.org',
        liveBroadcastContent: 'none',
        publishTime: '2020-04-15T13:19:55Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'duad-FbVIpCYd-BGGmuqn5KnOpk',
      id: { kind: 'youtube#video', videoId: 'qAgyemeRhTw' },
      snippet: {
        publishedAt: '2021-03-08T12:00:30Z',
        channelId: 'UCG04dVOTmbRYPY1wvshBVDQ',
        title: '3.1. Complete Numpy Tutorial in Python | Numpy Arrays',
        description: 'Check membership Perks: https://www.youtube.com/channel/UCG04dVOTmbRYPY1wvshBVDQ/join . This video is about ...',
        thumbnails: [Object],
        channelTitle: 'Siddhardhan',
        liveBroadcastContent: 'none',
        publishTime: '2021-03-08T12:00:30Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'zRp8r8R9bCxVvHEjyw_YnjiYgz8',
      id: { kind: 'youtube#video', videoId: '1t_yrWuVEJc' },
      snippet: {
        publishedAt: '2023-07-04T07:20:00Z',
        channelId: 'UCsvqVGtbbyHaMoevxPAq9Fg',
        title: 'NumPy Tutorial Part - 1 | NumPy Array | Python NumPy Tutorial | Python Training | Simplilearn',
        description: 'Note: 1+ Years of Work Experience Recommended to Sign up for Below Programs⬇️ Data Science Bootcamp (USS Only): ...',
        thumbnails: [Object],
        channelTitle: 'Simplilearn',
        liveBroadcastContent: 'none',
        publishTime: '2023-07-04T07:20:00Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'DpfN97jQzqi7k1OHHBrAaLToiKg',
      id: { kind: 'youtube#video', videoId: 'ZPu2Iso1EkE' },
      snippet: {
        publishedAt: '2023-06-26T12:00:28Z',
        channelId: 'UCCktnahuRFYIBtNnKT5IYyg',
        title: 'NumPy Tutorial | NumPy Python | Python Tutorial For Beginners | Python Training | Intellipaat',
        description: "Intellipaat's Advanced Certification in Data Science and AI: ...",
        thumbnails: [Object],
        channelTitle: 'Intellipaat',
        liveBroadcastContent: 'none',
        publishTime: '2023-06-26T12:00:28Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'xcuSkqw_l2K-hkyvsnDDCNuU2Ko',
      id: { kind: 'youtube#video', videoId: '3osJ59xXAGo' },
      snippet: {
        publishedAt: '2021-02-09T14:00:01Z',
        channelId: 'UCJghhFcuEmSUHkfjQcz--QQ',
        title: 'Python NumPy Tutorial for Beginners #5 - Shape and Reshaping Arrays',
        description: 'Learn Python NumPy! In this fifth video of the NumPy tutorial series, we explore shaping and reshaping arrays! NEW videos ...',
        thumbnails: [Object],
        channelTitle: 'Code of the Future',
        liveBroadcastContent: 'none',
        publishTime: '2021-02-09T14:00:01Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'Loewu_zzUZxLQ0-yGky6ZmUVm4A',
      id: { kind: 'youtube#video', videoId: 'I5Q7RdyyFcU' },
      snippet: {
        publishedAt: '2023-05-04T05:18:18Z',
        channelId: 'UCV7cZwHMX_0vk8DSYrS7GCg',
        title: 'Python NumPy Tutorial | Learn Coding',
        description: 'Python Download Link? https://www.python.org/downloads/ Please Subscribe our Channel....! Learn Coding Like ...',
        thumbnails: [Object],
        channelTitle: 'Learn Coding',
        liveBroadcastContent: 'none',
        publishTime: '2023-05-04T05:18:18Z'
      }
    }
    ];
  }
});


async function Summary(topic, background) {
  const prompt = `Given the topic ${topic} and the associated subtopics ${topic} and your task is to create 1-3 
  paragraphs of introductory content that caters to the following audience: ${background}.`;
  return "summary";
}

async function FlashCards(topic, background) {
  try {
    const {topic, background} = req.body
    const assistant = await openai.beta.assistants.create({
      name: "FlashCards generator",
      instructions: `you will be generating flashcard questions and answers for a user on a step of a multi-step learning process. Keep it detailed, and keep the tone casual but informative. the user's background is ${background}`,
      model: "gpt-4"
    });    
    asst_ids.push(assistant.id);
    const thread = await openai.beta.threads.create();
    const prompt = `given the topic below, generate flashcards and their respective answers. Return each flashcards with the following format: Q: for questions. A: for answers. The topic is ${topic}`;
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
          role: "user",
          content: prompt
      }
    )
    // console.log('message\n', message.content[0].text)
    const run = await openai.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: assistant.id,
        }
    )
    // console.log(thread)
    console.log("thread done\n")
    const ran = await openai.beta.threads.runs.retrieve(
      thread.id, run.id
    )
    // console.log(ran)
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
      console.log(message)
    }
  } catch (error) {
    throw error;
  }
}

async function Youtube(searchPrompt) {
  var useRealData = true;

  const apiKey = 'AIzaSyDp29FG3nd8fyuu_CL2m1OfokMkQldz7-0';

  const apiUrl = 'https://youtube.googleapis.com/youtube/v3/search';

  var data;

  const params = {
    part: 'snippet',
    maxResults: 5,
    q: searchPrompt,
    type: 'video',
    key: apiKey,
  };

  const headers = {
    //Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };

  if (useRealData) {
    await axios.get(apiUrl, { params, headers })
      .then(response => {
        // Store the response data in a variable
        data = response.data;
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error.message);
      });
    console.log(data.items[0]);
    data = data.items;
  }
  // use dummy data
  else {
    data = [{
      kind: 'youtube#searchResult',
      etag: '3DfIlanwP9T9RmJcrgiZlMysa24',
      id: { kind: 'youtube#video', videoId: 'rN0TREj8G7U' },
      snippet: {
        publishedAt: '2016-12-25T20:03:17Z',
        channelId: 'UCh9nVJoWXmFb7sLApWGcLPQ',
        title: 'numpy tutorial - introduction | numpy array vs python list',
        description: "This tutorial covers an introduction to numpy python module. We'll see why numpy is very popular and talk about its main feature ...",
        thumbnails: [Object],
        channelTitle: 'codebasics',
        liveBroadcastContent: 'none',
        publishTime: '2016-12-25T20:03:17Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'uZUs0w3Ac7kPmKoNkA-S0nEsx3E',
      id: { kind: 'youtube#video', videoId: '_d_Ka-ks2a0' },
      snippet: {
        publishedAt: '2016-12-28T00:04:42Z',
        channelId: 'UCh9nVJoWXmFb7sLApWGcLPQ',
        title: 'numpy tutorial - slicing/stacking arrays, indexing with boolean arrays',
        description: 'This tutorial covers numpy array operations such as slicing, indexing, stacking. We will also go over how to index one array with ...',
        thumbnails: [Object],
        channelTitle: 'codebasics',
        liveBroadcastContent: 'none',
        publishTime: '2016-12-28T00:04:42Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: '-WDuMzR8o-1ARnvd6ulYYiMNn2Y',
      id: { kind: 'youtube#video', videoId: 'ZB7BZMhfPgk' },
      snippet: {
        publishedAt: '2019-07-11T23:52:34Z',
        channelId: 'UCkhm72fuzkS9fYGlGpEmj7A',
        title: 'Introduction to Numerical Computing with NumPy | SciPy 2019 Tutorial | Alex Chabot-Leclerc',
        description: 'NumPy provides Python with a powerful array processing library and an elegant syntax that is well suited to expressing ...',
        thumbnails: [Object],
        channelTitle: 'Enthought',
        liveBroadcastContent: 'none',
        publishTime: '2019-07-11T23:52:34Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'PCM-S09z7TsTMrr_5Qb3qECXRQY',
      id: { kind: 'youtube#video', videoId: 'DI8wg3SRV90' },
      snippet: {
        publishedAt: '2019-08-21T14:54:23Z',
        channelId: 'UCCktnahuRFYIBtNnKT5IYyg',
        title: 'Numpy Tutorial | Python Numpy Tutorial | Intellipaat',
        description: 'Intellipaat Python training course: https://intellipaat.com/python-for-data-science-training/ Read complete Python tutorial here: ...',
        thumbnails: [Object],
        channelTitle: 'Intellipaat',
        liveBroadcastContent: 'none',
        publishTime: '2019-08-21T14:54:23Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'Zyx2hmQGUZlEE-IBpxpG5M8vozc',
      id: { kind: 'youtube#video', videoId: 'r-uOLxNrNk8' },
      snippet: {
        publishedAt: '2020-04-15T13:19:55Z',
        channelId: 'UC8butISFwT-Wl7EV0hUK0BQ',
        title: 'Data Analysis with Python - Full Course for Beginners (Numpy, Pandas, Matplotlib, Seaborn)',
        description: 'Learn Data Analysis with Python in this comprehensive tutorial for beginners, with exercises included! NOTE: Check description ...',
        thumbnails: [Object],
        channelTitle: 'freeCodeCamp.org',
        liveBroadcastContent: 'none',
        publishTime: '2020-04-15T13:19:55Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'duad-FbVIpCYd-BGGmuqn5KnOpk',
      id: { kind: 'youtube#video', videoId: 'qAgyemeRhTw' },
      snippet: {
        publishedAt: '2021-03-08T12:00:30Z',
        channelId: 'UCG04dVOTmbRYPY1wvshBVDQ',
        title: '3.1. Complete Numpy Tutorial in Python | Numpy Arrays',
        description: 'Check membership Perks: https://www.youtube.com/channel/UCG04dVOTmbRYPY1wvshBVDQ/join . This video is about ...',
        thumbnails: [Object],
        channelTitle: 'Siddhardhan',
        liveBroadcastContent: 'none',
        publishTime: '2021-03-08T12:00:30Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'zRp8r8R9bCxVvHEjyw_YnjiYgz8',
      id: { kind: 'youtube#video', videoId: '1t_yrWuVEJc' },
      snippet: {
        publishedAt: '2023-07-04T07:20:00Z',
        channelId: 'UCsvqVGtbbyHaMoevxPAq9Fg',
        title: 'NumPy Tutorial Part - 1 | NumPy Array | Python NumPy Tutorial | Python Training | Simplilearn',
        description: 'Note: 1+ Years of Work Experience Recommended to Sign up for Below Programs⬇️ Data Science Bootcamp (USS Only): ...',
        thumbnails: [Object],
        channelTitle: 'Simplilearn',
        liveBroadcastContent: 'none',
        publishTime: '2023-07-04T07:20:00Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'DpfN97jQzqi7k1OHHBrAaLToiKg',
      id: { kind: 'youtube#video', videoId: 'ZPu2Iso1EkE' },
      snippet: {
        publishedAt: '2023-06-26T12:00:28Z',
        channelId: 'UCCktnahuRFYIBtNnKT5IYyg',
        title: 'NumPy Tutorial | NumPy Python | Python Tutorial For Beginners | Python Training | Intellipaat',
        description: "Intellipaat's Advanced Certification in Data Science and AI: ...",
        thumbnails: [Object],
        channelTitle: 'Intellipaat',
        liveBroadcastContent: 'none',
        publishTime: '2023-06-26T12:00:28Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'xcuSkqw_l2K-hkyvsnDDCNuU2Ko',
      id: { kind: 'youtube#video', videoId: '3osJ59xXAGo' },
      snippet: {
        publishedAt: '2021-02-09T14:00:01Z',
        channelId: 'UCJghhFcuEmSUHkfjQcz--QQ',
        title: 'Python NumPy Tutorial for Beginners #5 - Shape and Reshaping Arrays',
        description: 'Learn Python NumPy! In this fifth video of the NumPy tutorial series, we explore shaping and reshaping arrays! NEW videos ...',
        thumbnails: [Object],
        channelTitle: 'Code of the Future',
        liveBroadcastContent: 'none',
        publishTime: '2021-02-09T14:00:01Z'
      }
    },
    {
      kind: 'youtube#searchResult',
      etag: 'Loewu_zzUZxLQ0-yGky6ZmUVm4A',
      id: { kind: 'youtube#video', videoId: 'I5Q7RdyyFcU' },
      snippet: {
        publishedAt: '2023-05-04T05:18:18Z',
        channelId: 'UCV7cZwHMX_0vk8DSYrS7GCg',
        title: 'Python NumPy Tutorial | Learn Coding',
        description: 'Python Download Link? https://www.python.org/downloads/ Please Subscribe our Channel....! Learn Coding Like ...',
        thumbnails: [Object],
        channelTitle: 'Learn Coding',
        liveBroadcastContent: 'none',
        publishTime: '2023-05-04T05:18:18Z'
      }
    }
    ];
  }

  var videoIds = [];
  data.forEach(element => {
    videoIds.push(element.id.videoId);
  });

  var videoNames = [];
  data.forEach(element => {
    videoNames.push(element.snippet.title);
  });

  return [videoIds, videoNames];
}

async function Content(topic, background, question1, answer1, question2, answer2) {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "Headlines generator",
      instructions: "you will be given a topic user wants to learn, their background, and answers to two questions that give further information of the user's learning objectives. Give 10 personalized headlines of steps to accomplish the users learning goals.",
      model: "gpt-4"
    });    
    asst_ids.push(assistant.id);
    const thread = await openai.beta.threads.create();
    prompt = `topic: "${topic}", background: "${background}", question1: "${question1}", answer1: "${answer1}", question2: "${question2}", answer2: "${answer2}"`
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
          role: "user",
          content: prompt
      }
    )
    // console.log('message\n', message.content[0].text)
    const run = await openai.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: assistant.id,
        }
    )
    // console.log(thread)
    console.log("thread done\n")
    const ran = await openai.beta.threads.runs.retrieve(
      thread.id, run.id
    )
    // console.log(ran)
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
        text = message.content[0].text.value;
        const headlines = text.split('\n');
        const json = {};
        headlines.forEach(headline => {
            const match = headline.match(/^(\d+)\. "(.*)"$/);
            if (match) {
                json[match[1]] = match[2];
            }
        });
        console.log(json)
        return json;
      }
    }
  } catch(error) {
    throw error
  }

}

app.post('/api/generate-subtopic', async (req, res) => {
  try {
    const {headlines, number, background} = req.body
    console.log(headlines)
    console.log(number)
    console.log(background)
    const assistant = await openai.beta.assistants.create({
      name: "Headlines generator",
      instructions: `you will be generating detailed course content for a user on a step of a multi-step learning process. Keep it detailed, and keep the tone casual but informative. the user's background is ${background}. give the output in HTML, where the biggest font used is h3`,
      model: "gpt-4"
    });    
    asst_ids.push(assistant.id);
    const thread = await openai.beta.threads.create();
    const prompt = `given the 10 headlines below, generate course content for headline number ${number}. You may assume that the user has completed the steps before it if there are any. Be detailed and generate a few paragraphs. Headlines: ${headlines}`;
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
          role: "user",
          content: prompt
      }
    )
    // console.log('message\n', message.content[0].text)
    const run = await openai.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: assistant.id,
        }
    )
    // console.log(thread)
    console.log("thread done\n")
    const ran = await openai.beta.threads.runs.retrieve(
      thread.id, run.id
    )
    // console.log(ran)
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
        console.log(message.content);
        res.json(message.content[0].text.value)
      }
    }
  } catch (error) {
    throw error;
  }
});

async function QA(topics) {
  return "QA";
}

async function PracticeProblems(topic) {
  return "Practice problems";
}

app.post('/api/getTopicData', async (req, res) => {
  const {topic, background, question1, answer1, question2, answer2} = req.body
  
  var outputs = {};

  // if (contentTypes.includes("Summary")) {
  //   outputs["Summary"] = await Summary(topic, background);
  // }
  // if (contentTypes.includes("FlashCards")) {
  //   outputs["FlashCards"] = await FlashCards(topic);
  // }
  // if (contentTypes.includes("Youtube")) {
    var [id, names] = await Youtube(topic);
    outputs["Youtube"] = id;
    outputs["YoutubeNames"] = names;
  // }
  // if (contentTypes.includes("Content")) {
  try {
    outputs["Content"] = await Content(topic, background, question1, answer1, question2, answer2);
    // }
    // if (contentTypes.includes("QA")) {
    //   outputs["QA"] = QA(topic);
    // }
    // if (contentTypes.includes("PracticeProblems")) {
    //   outputs["PracticeProblems"] = PracticeProblems(topic);
    // }

    console.log(outputs);

    res.json(outputs);
  } catch (error) {
    res.status(500).send(error.message)
  }

})

app.get('/test', async (req, res) => {
  res.json("hello world");
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    for(const ass of asst_ids) {
      const response = await openai.beta.assistants.del(ass);
      console.log(response);
    }
    process.exit(0)
})
