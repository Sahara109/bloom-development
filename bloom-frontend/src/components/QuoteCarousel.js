import React, { useState, useEffect } from 'react';
import './QuoteCarousel.css';

const quotes = [
  "🌱 Take it one day at a time.",
  "💖 You are not alone on this journey.",
  "🌼 Your feelings are valid.",
  "🧘‍♀️ Breathe. You are doing your best.",
  "🌸 Healing takes time. Be gentle with yourself.",
  "🌈 It's okay to ask for help — you're human.",
  "☀️ Every day is a new beginning.",
  "🌻 You’ve survived 100% of your worst days so far, you are stronger than you think you are",
  "🫶 Your story matters.",
  "💫 Progress, not perfection.",
  "🌙 It's okay to rest. Healing isn't linear.",
  "💐 You are growing through what you are going through.",
  "💭 Even on the cloudiest days, the sun is still there."
];


const QuoteCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change quote every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-carousel">
      <p className="quote-text">{quotes[currentIndex]}</p>
    </div>
  );
};

export default QuoteCarousel;
