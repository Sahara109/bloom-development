import React, { useEffect, useState } from "react";
import ExerciseCard from './ExerciseCard';


const MindfulExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/exercises")  // Add full URL
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);
  
  return (
    <div>
      <h2>Mindful Exercises</h2>
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} {...exercise} />
        ))}
      </div>
    </div>
  );
};

export default MindfulExercises;
