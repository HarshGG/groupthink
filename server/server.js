// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 5000;

// OpenAI API endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Route to handle OpenAI API calls
app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      { prompt: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error making request to OpenAI API');
  }
});


async function Summary() {

}

async function FlashCards() {

}

async function Youtube(searchPrompt) {
  var useRealData = false;

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

  // refine by description relevance

  var videoIds = [];
  data.forEach(element => {
    videoIds.push(element.id.videoId);
  });

  return videoIds;
}

async function Content() {

}

async function QA() {

}

async function PracticeProblems() {

}

app.get('/api/getTopicData', async (req, res) => {
  // types of content to be generated
  // var contentTypes = req.query.contentTypes;
  var contentTypes = ["Summary", "FlashCards", "Youtube"];
  // var topic = req.query.topic;
  var topic = "Numpy and Pandas";

  var outputs = {};

  if (contentTypes.includes("Summary")) {
    outputs["Summary"] = "This is a summary";
  }
  if (contentTypes.includes("FlashCards")) {
    outputs["FlashCards"] = "This is flashcards";
  }
  if (contentTypes.includes("Youtube")) {
    outputs["Youtube"] = await Youtube(topic);
  }
  if (contentTypes.includes("Content")) {
    outputs["Content"] = "This is content";
  }
  if (contentTypes.includes("QA")) {
    outputs["QA"] = "This is Q&A";
  }
  if (contentTypes.includes("PracticeProblems")) {
    outputs["PracticeProblems"] = "This is practice problems";
  }

  console.log(outputs);

  res.json(outputs);

})

app.get('/test', async (req, res) => {
  res.json("hello world");
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
