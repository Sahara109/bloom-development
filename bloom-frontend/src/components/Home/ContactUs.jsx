import React from 'react';

const ContactUs = () => {
  const styles = {
    container: {
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.7',
      maxWidth: '600px',
      margin: '0 auto',
      color: '#333',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: '#0081a7',
    },
    paragraph: {
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textarea: {
      padding: '10px',
      height: '120px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '12px',
      backgroundColor: '#00afb9',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.paragraph}>
        We'd love to hear from you! If you have questions, suggestions, or just want to say hello, fill out the form below.
      </p>

      <form style={styles.form}>
        <input style={styles.input} type="text" placeholder="Your Name" required />
        <input style={styles.input} type="email" placeholder="Your Email" required />
        <textarea style={styles.textarea} placeholder="Your Message" required />
        <button style={styles.button} type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
