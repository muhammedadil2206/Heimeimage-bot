import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Hero from '../components/Hero';
import GeneratedImage from '../components/GeneratedImage';
import PromptHistory from '../components/PromptHistory';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth.js';
import { fetchHistory, generateImage } from '../services/imageService';
import { checkServerHealth } from '../utils/apiHealth';

const Home = () => {
  const { isAuthenticated, token, loading, user } = useAuth();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [currentImage, setCurrentImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate, loading]);

  // Handle token expiration
  useEffect(() => {
    const handleStorageChange = () => {
      // If token was cleared, redirect to login
      if (!localStorage.getItem('heimage_auth')) {
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  // Check server health on mount
  useEffect(() => {
    const verifyServer = async () => {
      const health = await checkServerHealth();
      if (!health.isHealthy) {
        console.error('Server health check failed:', health);
        toast.error(`Cannot connect to server: ${health.message}. Please make sure the backend is running on port 5000.`, {
          duration: 5000,
        });
      } else {
        console.log('Server health check passed:', health);
      }
    };
    verifyServer();
  }, []);

  // Debug: Log token info on mount
  useEffect(() => {
    try {
      if (token) {
        console.log('=== Token Debug Info ===');
        console.log('Token exists:', !!token);
        console.log('Token length:', token?.length || 0);
        console.log('Token preview:', token ? token.substring(0, 30) + '...' : 'None');
        console.log('User:', user);
        console.log('Is authenticated:', isAuthenticated);
        console.log('Loading:', loading);
        console.log('========================');
      } else {
        console.warn('No token found in auth context');
        console.log('Loading:', loading);
        console.log('Is authenticated:', isAuthenticated);
      }
    } catch (error) {
      console.error('Error in token debug:', error);
    }
  }, [token, user, isAuthenticated, loading]);

  useEffect(() => {
    const loadHistory = async () => {
      if (!token) return;
      setHistoryLoading(true);
      try {
        const data = await fetchHistory(token);
        setHistory(data.prompts || []);
      } catch (error) {
        // Handle session expiration
        if (error.message === 'SESSION_EXPIRED' || error.message.includes('Invalid or expired token')) {
          console.log('Session expired, redirecting to login');
          localStorage.removeItem('heimage_auth');
          navigate('/login', { replace: true });
          return;
        }
        console.error('Failed to load history:', error);
        // Don't show toast for history errors, just log it
      } finally {
        setHistoryLoading(false);
      }
    };

    if (token) {
      loadHistory();
    }
  }, [token, navigate]);

  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!token) {
      console.error('No token available');
      toast.error('Authentication required. Please login again.');
      navigate('/login');
      return;
    }
    if (!prompt.trim()) return;

    console.log('=== Generating Image ===');
    console.log('Token present:', token ? 'Yes' : 'No');
    console.log('Token length:', token?.length || 0);
    console.log('Token preview:', token ? `${token.substring(0, 20)}...` : 'None');
    console.log('Prompt:', prompt);
    console.log('Style:', style);

    setIsGenerating(true);
    setCurrentImage(null); // Clear previous image
    
    try {
      console.log('Starting image generation...');
      const data = await generateImage({ prompt, style, token });
      
      console.log('Image generation successful:', {
        hasImageUrl: !!data?.imageUrl,
        imageUrlPreview: data?.imageUrl?.substring(0, 50) + '...',
        message: data?.message,
      });
      
      if (!data?.imageUrl) {
        throw new Error('No image URL in response from server');
      }
      
      setCurrentImage({ imageUrl: data.imageUrl, prompt, style });
      toast.success('Image generated successfully!');
      
      // Refresh history
      try {
        const refreshed = await fetchHistory(token);
        setHistory(refreshed.prompts || []);
      } catch (historyError) {
        console.warn('Failed to refresh history:', historyError);
        // Don't fail the whole operation if history refresh fails
      }
    } catch (error) {
      console.error('=== Image Generation Failed ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Handle session expiration
      if (error.message === 'SESSION_EXPIRED' || error.message.includes('Invalid or expired token')) {
        toast.error('Your session has expired. Please log in again.', {
          duration: 5000,
        });
        // Clear auth state and redirect to login
        localStorage.removeItem('heimage_auth');
        navigate('/login', { replace: true });
        return;
      }
      
      const errorMessage = error.message || 'Failed to generate image. Please check the console for details.';
      toast.error(errorMessage);
      
      // Set a null image to show the placeholder
      setCurrentImage(null);
    } finally {
      setIsGenerating(false);
      console.log('Image generation process completed');
    }
  };

  const handleSelectHistory = (item) => {
    setCurrentImage(item);
    setPrompt(item.prompt);
    setStyle(item.style);
  };

  const handleDownload = () => {
    if (!currentImage?.imageUrl) return;

    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    link.download = 'heimage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="py-20">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16 py-6 sm:py-8 md:py-10">
      <Hero
        prompt={prompt}
        setPrompt={setPrompt}
        style={style}
        setStyle={setStyle}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {isGenerating ? (
        <Loader />
      ) : (
        <GeneratedImage
          imageUrl={currentImage?.imageUrl}
          prompt={currentImage?.prompt}
          onDownload={handleDownload}
          isGenerating={isGenerating}
        />
      )}

      <section className="space-y-4 sm:space-y-6">
        {historyLoading ? (
          <Loader />
        ) : (
          <PromptHistory history={history} onSelect={handleSelectHistory} />
        )}
      </section>
    </div>
  );
};

export default Home;

