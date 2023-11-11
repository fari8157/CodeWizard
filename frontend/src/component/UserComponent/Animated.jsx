import React, { useEffect } from 'react';
import welcomeSound from '../../../public/welcom.mp3'; // Import the audio file

const AnimationWindow = () => {
  useEffect(() => {
    // Play the welcome sound when the component mounts
    const audio = new Audio(welcomeSound);
    audio.play();

    // Automatically navigate after sound finishes (adjust the duration)
    setTimeout(() => {
      // Add your navigation logic here
    }, audio.duration * 1000); // Convert audio duration to milliseconds
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl">
      <div className="text-center">
        <p>Welcome, student!</p>
        <p>You can improve your coding skills with our website.</p>
        {/* Add your animation or design here */}
      </div>
    </div>
  );
};

export default AnimationWindow;
