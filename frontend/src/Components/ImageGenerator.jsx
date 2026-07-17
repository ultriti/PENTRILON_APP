import {React, useEffect, useState } from 'react';
import puter from '@heyputer/puter.js';
const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for Puter.js to load
    const checkPuter = () => {
      if (puter.ai && puter.ai.image) {
        setIsLoaded(true);
      } else {
        requestAnimationFrame(checkPuter);
      }
    };
    checkPuter();
  }, []);

  const generateImage = async () => {
    if (!isLoaded) return;

    try {
      const img = await puter.ai.image.generate({
        prompt: "dragon flying over mountains, cyberpunk style",
        model: "flux.1-schnell"
      });
      setImageUrl(img.src);  // Returns <img> element or URL
    } catch (error) {
      console.error('Image generation failed:', error);
    }
  };

  return (
    <div>
      <button onClick={generateImage} disabled={!isLoaded}>
        {isLoaded ? 'Generate Image' : 'Loading Puter.js...'}
      </button>
      {imageUrl && <img src={imageUrl} alt="AI Generated" className="w-96 h-96 object-cover mt-4" />}
    </div>
  );
}

export default ImageGenerator;
