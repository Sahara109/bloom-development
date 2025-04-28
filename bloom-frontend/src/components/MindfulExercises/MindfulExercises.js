import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";

const MindfulExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // change if your token is stored differently

    fetch("http://localhost:5001/api/exercises", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched exercises data:", data);
        setExercises(Array.isArray(data) ? data : data.exercises || []);
      })
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
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} {...exercise} />
          ))
        ) : (
          <p>No exercises found or loading...</p>
        )}
      </div>
    </div>
  );
};

export default MindfulExercises;
