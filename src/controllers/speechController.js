const axios = require('axios');

const transcribeSpeech = async (req, res) => {
  try {
    const { audio } = req.body;
    const response = await axios.post('https://speech.googleapis.com/v1/speech:recognize', {
      config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
      audio: { content: audio }
    }, {
      headers: { 'Authorization': `Bearer ${process.env.GOOGLE_CLOUD_API_KEY}` }
    });
    res.json({ text: response.data.results[0].alternatives[0].transcript });
  } catch (error) {
    res.status(500).json({ error: 'Speech transcription failed' });
  }
};

module.exports = { transcribeSpeech };