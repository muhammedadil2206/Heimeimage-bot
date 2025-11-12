const axios = require('axios');
const FormData = require('form-data');
const User = require('../models/User');

const CLIPDROP_URL = 'https://clipdrop-api.co/text-to-image/v1';

exports.generateImage = async (req, res) => {
  console.log('=== Image Generation Request ===');
  console.log('User ID:', req.user?.id);
  console.log('Request body:', { prompt: req.body.prompt, style: req.body.style });
  
  const { prompt, style } = req.body;

  // Validate input
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  if (!style) {
    return res.status(400).json({ message: 'Style is required' });
  }

  // Check API key
  if (!process.env.CLIPDROP_API_KEY) {
    console.error('CLIPDROP_API_KEY is not set in environment variables');
    return res.status(500).json({ message: 'Clipdrop API key is not configured' });
  }

  console.log('API Key present:', process.env.CLIPDROP_API_KEY ? 'Yes' : 'No');
  console.log('API Key length:', process.env.CLIPDROP_API_KEY?.length || 0);

  try {
    // Enhance prompt with style
    const enhancedPrompt = `${prompt.trim()}, ${style.toLowerCase()} style`;
    console.log('Enhanced prompt:', enhancedPrompt);
    
    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('prompt', enhancedPrompt);

    console.log('Sending request to Clipdrop API...');
    console.log('API URL:', CLIPDROP_URL);
    console.log('API Key (first 10 chars):', process.env.CLIPDROP_API_KEY?.substring(0, 10));
    
    const requestHeaders = {
      'x-api-key': process.env.CLIPDROP_API_KEY,
      ...formData.getHeaders(),
    };
    console.log('Request headers:', Object.keys(requestHeaders));
    
    const clipdropResponse = await axios.post(CLIPDROP_URL, formData, {
      headers: requestHeaders,
      responseType: 'arraybuffer',
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      validateStatus: function (status) {
        // Don't throw error for any status, we'll handle it manually
        return status < 600;
      },
    });

    console.log('Clipdrop API response status:', clipdropResponse.status);
    console.log('Clipdrop API response headers:', JSON.stringify(clipdropResponse.headers, null, 2));

    // Check if response is successful
    if (clipdropResponse.status !== 200) {
      let errorMessage = `Clipdrop API returned status ${clipdropResponse.status}`;
      try {
        const errorText = Buffer.from(clipdropResponse.data).toString('utf8');
        console.error('Error response from Clipdrop:', errorText);
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || errorJson.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
      }
      throw new Error(errorMessage);
    }

    if (!clipdropResponse.data || clipdropResponse.data.length === 0) {
      throw new Error('Received empty response from Clipdrop API');
    }

    const imageBuffer = Buffer.from(clipdropResponse.data);
    const imageBase64 = imageBuffer.toString('base64');
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    console.log('Image generated successfully, size:', imageBuffer.length, 'bytes');

    // Save to user history
    try {
      if (!req.user?.id) {
        console.warn('No user ID in request, skipping history save');
      } else {
        const user = await User.findById(req.user.id);
        if (user) {
          await user.addPrompt({ prompt: prompt.trim(), style, imageUrl });
          console.log('Prompt saved to user history');
        } else {
          console.warn('User not found in database:', req.user.id);
        }
      }
    } catch (historyError) {
      console.error('Error saving prompt to history:', historyError.message);
      // Don't fail the request if history save fails
    }

    return res.status(200).json({
      message: 'Image generated successfully',
      imageUrl,
    });
  } catch (error) {
    console.error('=== Image Generation Error ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Make sure we always send a response
    try {
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response status text:', error.response.statusText);
        console.error('Response headers:', JSON.stringify(error.response.headers, null, 2));
        
        let errorData = null;
        try {
          if (error.response.data) {
            const errorBuffer = Buffer.from(error.response.data);
            const errorText = errorBuffer.toString('utf8');
            console.error('Error response data (text):', errorText.substring(0, 500));
            try {
              errorData = JSON.parse(errorText);
              console.error('Error response data (JSON):', errorData);
            } catch (parseError) {
              errorData = { raw: errorText.substring(0, 200) };
            }
          }
        } catch (bufferError) {
          console.error('Error parsing response data:', bufferError.message);
        }

        const status = error.response.status;
        let message = 'Failed to generate image';
        
        if (status === 401) {
          message = 'Invalid Clipdrop API key. Please check your API key in the .env file and restart the server.';
          console.error('401 Unauthorized - Check if API key is correct');
        } else if (status === 429) {
          message = 'API rate limit exceeded. Please try again later.';
          console.error('429 Rate limit exceeded');
        } else if (status === 400) {
          message = errorData?.error || errorData?.message || 'Invalid request to Clipdrop API. Check your prompt.';
          console.error('400 Bad Request:', errorData);
        } else if (status === 500) {
          message = 'Clipdrop API server error. Please try again later.';
          console.error('500 Server Error from Clipdrop');
        } else if (errorData) {
          message = errorData.error || errorData.message || message;
        }
        
        return res.status(status < 500 ? status : 500).json({ message });
      }

      if (error.request) {
        console.error('No response received from Clipdrop API');
        console.error('Request was made but no response received');
        console.error('Request config:', {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
        });
        return res.status(503).json({ 
          message: 'Unable to reach Clipdrop API. The request timed out or the service is unavailable. Please check your internet connection and try again.' 
        });
      }

      // Generic error
      return res.status(500).json({ 
        message: error.message || 'Failed to generate image. Please check server logs for details.' 
      });
    } catch (responseError) {
      // If we can't send a response, log it
      console.error('CRITICAL: Failed to send error response:', responseError);
      // Try to send a basic error
      if (!res.headersSent) {
        return res.status(500).json({ 
          message: 'Internal server error during image generation' 
        });
      }
    }
  }
};

