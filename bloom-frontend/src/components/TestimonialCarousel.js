import React, { useState, useEffect } from "react";
import "./TestimonialCarousel.css";

const testimonials = [
  {
    quote: "This app helped me find calm during stressful times.",
    author: "Anonymous",
  },
  {
    quote: "The community stories made me realize I’m not alone.",
    author: "Selena G.",
  },
  {
    quote: "I love the daily mood tracker. It keeps me aware of my feelings.",
    author: "Sarah K.",
  },
  {
    quote: "The AI chatbot is like a supportive friend when I need it most.",
    author: "Michael B.",
  },
  {
    quote: "BLOOM has been a life-changing tool for my mental wellbeing.",
    author: "Anonymous",
  },
  {
    quote: "The stress-relief exercises really helped me manage my anxiety.",
    author: "Jessica L.",
  },
  {
    quote: "I appreciate how easy it is to access useful mental health resources here.",
    author: "David M.",
  },
  {
    quote: "Tracking my mood daily has made a big difference in understanding myself.",
    author: "Bilal K.",
  },
  {
    quote: "The supportive community on BLOOM has inspired me to keep going.",
    author: "Anonymous",
  },
  {
    quote: "A gentle and compassionate tool that makes mental health feel accessible.",
    author: "Austin B.",
  },
];


const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="testimonial-carousel">
      <button className="nav-arrow left-arrow" onClick={prevSlide}>&lt;</button>
      <div className="testimonial-card">
        <p className="testimonial-quote">“{testimonials[currentIndex].quote}”</p>
        <p className="testimonial-author">— {testimonials[currentIndex].author}</p>
      </div>
      <button className="nav-arrow right-arrow" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default TestimonialCarousel;
