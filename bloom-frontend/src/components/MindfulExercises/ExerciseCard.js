import React, { useState } from "react";
import Modal from "react-modal"; // If you installed react-modal
import "./ExerciseCard.css"; // Ensure you have styles

const ExerciseCard = ({ name, description, image, video }) => {
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
        {video ? (
        <iframe
          width="100%"
          height="315"
          src={video}  // This should be the embed URL
          title={name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Video not available</p>
      )}

        <button onClick={() => setModalIsOpen(false)} className="close-button">Close</button>
      </Modal>
    </div>
  );
};

export default ExerciseCard;
