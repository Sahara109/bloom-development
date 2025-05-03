import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExerciseCard.css";

const ExerciseCard = ({ _id, name, description, image }) => {
  const navigate = useNavigate();

  const handleStartExercise = () => {
    navigate(`/exercise/${_id}`);
  };

  return (
    <div className="exercise-card">
      <div className="exercise-card-image">
        <img className="exercise-image" src={`/images/${image}`} alt={name} />
      </div>
      <div className="exercise-card-content">
        <h3 className="exercise-title">{name}</h3>
        <p className="exercise-description">{description}</p>
        <button className="exercise-button" onClick={handleStartExercise}>
          Start Exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
