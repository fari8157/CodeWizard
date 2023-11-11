import React, { useEffect, useState } from 'react';
import './Header.css'; // Import a CSS file for styling and animations

const Header = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Mark animation as complete after a delay
    const animationTimeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000); // Adjust the delay (1s) to match your CSS animation duration

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <section className={`header-container ${animationComplete ? 'animation-complete' : ''} bg-cover bg-center bg-header-bg-img text-white dark:bg-blue-950 `}>
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-between">
          <div className={`w-1/2 header-content ${animationComplete ? 'slide-in-left' : ''}`}>
            <h1 className="text-4xl text-blue-950">Empowering Your <strong>Learning Journey</strong></h1>
            <p className="mt-2 text-xl text-cyan-800">Unlock a world of knowledge and opportunities. Learn from expert instructors and gain valuable skills at your own pace.</p>
            <button className="bg-blue-900 text-white rounded-full px-6 py-4 mt-6 font-bold hover:bg-white hover:text-blue-900">Start Learning</button>
          </div>
          <div className={`w-1/2 header-image ${animationComplete ? 'slide-in-right' : ''}`}>
            <img src="public/banner.png" alt="E-Learning Platform Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
