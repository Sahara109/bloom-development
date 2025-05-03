import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To read URL params

const ExerciseDetail = () => {
  const { id } = useParams(); // Get the exercise ID from the URL
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:5001/api/exercises/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        setExercise(data);
      })
      .catch((err) => console.error("Error fetching exercise details:", err));
  }, [id]);

  if (!exercise) return <p>Loading...</p>;

  const {
    name,
    description,
    video,
    image,
    steps = [],
    benefits = [],
  } = exercise;
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{name}</h2>

      {image && (
        <img
          src={`/images/${image}`}
          alt={name}
          style={styles.image}
        />
      )}

      <p style={styles.description}>{description}</p>

      {steps.length > 0 && (
        <>
          <h3 style={styles.sectionTitle}>Steps</h3>
          <ol style={styles.list}>
            {steps.map((step, index) => (
              <li key={index} style={styles.listItem}>
                {step}
              </li>
            ))}
          </ol>
        </>
      )}

      {benefits.length > 0 && (
        <>
          <h3 style={styles.sectionTitle}>Benefits</h3>
          <ol style={styles.list}>
            {benefits.map((benefit, index) => (
              <li key={index} style={styles.listItem}>
                {benefit}
              </li>
            ))}
          </ol>
        </>
      )}

      {video ? (
        <video
          controls
          style={styles.video}
        >
          <source src={`/videos/${video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Video not available</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "15px",
    fontSize: "2rem",
    color: "#333",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "20px",
    borderRadius: "8px",
  },
  description: {
    marginBottom: "20px",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
  },
  sectionTitle: {
    marginTop: "30px",
    fontSize: "1.5rem",
    color: "#333",
    borderBottom: "2px solid #3b82f6",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    listStyleType: "disc",
    fontSize: "1.1rem",
    color: "#555",
  },
  listItem: {
    marginBottom: "8px",
    lineHeight: "1.8",
  },
  video: {
    width: "100%",
    maxWidth: "640px",
    height: "auto",
    marginTop: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default ExerciseDetail;
