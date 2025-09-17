import OpenAI from 'openai';

const apiKey = 'sk-proj-Qc4rxDWPm4IDha1HaiSWVRSTiLUtugfYwccDvJIrcGxpAza-H5x_5Ozy_Ypxi2ix9WPgA';

let openai;
if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
} else {
  console.error('OpenAI API key is missing!');
}

export const generateImage = async (prompt, style) => {
  if (!openai) {
    throw new Error('OpenAI client is not initialized. Check your API key.');
  }

  const fullPrompt = `${prompt}, in the style of ${style}, digital art, trending on artstation`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });
    
    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL returned from API.');
    }
    
    return imageUrl;
  } catch (error) {
    console.error('Error generating image with OpenAI:', error);
    let errorMessage = 'Failed to generate image. Please try again.';
    if (error.response) {
      errorMessage = error.response.data.error.message;
    } else if (error.message.includes('billing')) {
      errorMessage = 'Image generation failed due to a billing issue with your OpenAI account.';
    }
    throw new Error(errorMessage);
  }
};