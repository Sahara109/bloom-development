import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import './ExerciseCard.css';  // Make sure you create the CSS file or use inline styles


const ExerciseCard = ({ name, description, image }) => {
  return (
    <div className="exercise-card">
      <div className="exercise-card-image">
        <img className="exercise-image" src={image} alt={name} />
      </div>
      <div className="exercise-card-content">
        <h3 className="exercise-title">
          <FontAwesomeIcon icon={faRunning} /> {name}
        </h3>
        <p className="exercise-description">{description}</p>
        <button className="exercise-button">Start Exercise</button>
      </div>
    </div>
  );
};

export default ExerciseCard;
