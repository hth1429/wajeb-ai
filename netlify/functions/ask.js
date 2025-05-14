const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { question } = JSON.parse(event.body);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-مفتاحك-هنا'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return {
        statusCode: 200,
        body: JSON.stringify({ answer: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No answer returned' })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message })
    };
  }
};
