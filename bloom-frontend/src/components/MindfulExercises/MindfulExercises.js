import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // If you installed react-modal
import "./ExerciseCard.css"; // Ensure you have styles

const MindfulExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); 

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

        <ul>
          <h4>Additional Information:</h4>
          <li>Duration: 10 minutes</li>
          <li>Category: Meditation</li>
        </ul>

        <button onClick={() => setModalIsOpen(false)} className="close-button">Close</button>
      </Modal>
    </div>
  );
};

// Moving styles to a named export
export const exerciseCardStyles = `
.exercise-card {
  width: 300px; /* Adjust as needed */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  background-color: #fff;
}

.exercise-card-image {
  width: 100%;
  height: 180px; /* Set a fixed height */
  overflow: hidden;
}

.exercise-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.exercise-card-content {
  padding: 15px;
}

.exercise-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.exercise-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
}

.exercise-button {
  padding: 10px 15px;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.exercise-button:hover {
  background-color: #45a049;
}

.exercise-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}

.close-button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #ea1409;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

/* Adding the new CSS you requested */
.exercise-modal ul {
  list-style-type: disc;
  padding-left: 20px;
  text-align: left;
}

.exercise-modal h4 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
`;

export default MindfulExercises;
