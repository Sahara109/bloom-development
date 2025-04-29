import React, { useState } from "react";
import Modal from "react-modal";
import "./ExerciseCard.css";

const ExerciseCard = ({ name, description, image, video, steps, benefits }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="exercise-card">
      <div className="exercise-card-image">
        <img className="exercise-image" src={`/images/${image}`} alt={name} />
      </div>
      <div className="exercise-card-content">
        <h3 className="exercise-title">{name}</h3>
        <p className="exercise-description">{description}</p>
        <button className="exercise-button" onClick={() => setModalIsOpen(true)}>
          Start Exercise
        </button>
      </div>

      {/* Modal for Exercise */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="exercise-modal">
        <h2>{name}</h2>
        <p>{description}</p>
        
        {/* Displaying Steps */}
        <h4>Steps:</h4>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        
        {/* Displaying Benefits */}
        <h4>Benefits:</h4>
        <ul>
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        {/* Local video player */}
        {video ? (
          <video width="100%" height="auto" controls>
            <source src={`/videos/${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Video not available</p>
        )}

        <button onClick={() => setModalIsOpen(false)} className="close-button">Close</button>
      </Modal>
    </div>
  );
};

export default ExerciseCard;
