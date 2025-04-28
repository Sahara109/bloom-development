import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const { auth } = useAuth();

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/articles',
        { title, content },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setMessage('✅ Article added successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding article.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create a New Article</h2>
        <form onSubmit={handleAddArticle} style={styles.form}>
          <label style={styles.label} htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter your article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label} htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your article content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Publish Article
          </button>
        </form>

        {message && <p style={message.includes('✅') ? styles.successMsg : styles.errorMsg}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '80vh',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  formContainer: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    padding: '2rem 3rem',
    maxWidth: '550px',
    width: '100%',
  },
  title: {
    marginBottom: '1.8rem',
    fontWeight: '700',
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  },
  label: {
    fontWeight: '600',
    color: '#555',
    marginBottom: '0.4rem',
    fontSize: '1rem',
  },
  input: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '2px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '2px solid #ddd',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit',
  },
  button: {
    padding: '1rem',
    backgroundColor: '#6a5acd',  // soft violet
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(106,90,205,0.5)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  successMsg: {
    marginTop: '1.5rem',
    color: '#28a745',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMsg: {
    marginTop: '1.5rem',
    color: '#dc3545',
    fontWeight: '600',
    textAlign: 'center',
  },
};

export default AddArticle;
