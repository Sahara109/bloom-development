import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

const MindfulExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  };

  return (
    <div>
      <h2 style={{ color: "grey" }}>Mindful Exercises</h2>
      <div style={containerStyle}>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} {...exercise} />
        ))}
      </div>
    </div>
  );
};

export default MindfulExercises;
