import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await api.get(`/stories/${id}`);
        setStory(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!story) return <p>Story not found.</p>;

  const handleBackClick = () => {
    navigate("/stories");
  };

  return (
    <div className="story-detail">
      <style>
        {`
          .story-detail {
            max-width: 800px;
            margin: 40px auto;
            padding: 30px;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            font-family: 'Roboto', sans-serif;
            background-color: #f4f7fc;
            overflow: hidden;
          }

          /* Banner Styling */
          .banner {
            width: 100%;
            height: 600px;
            background-image: url('/images/banner2.png');  
            background-position: center;
            background-size: cover;
            border-radius: 16px;
            margin-bottom: 20px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          }

          .story-detail h2 {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 20px;
            font-weight: 700;
            text-align: center;
            text-transform: capitalize;
          }

          .story-image {
            width: 100%;
            max-height: 450px;
            object-fit: cover;
            border-radius: 15px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          .story-detail p {
            font-size: 1.2rem;
            color: #555;
            line-height: 1.8;
            margin-bottom: 20px;
            text-align: justify;
            font-weight: 400;
          }

          .back-button {
            display: inline-block;
            background-color: #6c63ff;
            color: white;
            font-size: 1.2rem;
            padding: 12px 24px;
            border-radius: 30px;
            text-align: center;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            font-weight: 600;
            margin-top: 30px;
            letter-spacing: 1px;
          }

          .back-button:hover {
            background-color: #5a52e4;
            transform: scale(1.05);
          }

          .back-button:active {
            transform: scale(0.98);
          }

          @media (max-width: 768px) {
            .story-detail {
              padding: 20px;
            }

            .story-detail h2 {
              font-size: 2rem;
            }

            .story-detail p {
              font-size: 1rem;
            }

            .back-button {
              font-size: 1rem;
              padding: 10px 20px;
            }

            .banner {
              height: 200px; /* Reduce height for mobile */
            }
          }
        `}
      </style>

      {/* Banner Image */}
      <div className="banner"></div>

      <h2>{story.title}</h2>
      {story.image && <img src={story.image} alt={story.title} className="story-image" />}
      <p>{story.content}</p>

      <button className="back-button" onClick={handleBackClick}>Back to Stories</button>
    </div>
  );
};

export default StoryDetail;