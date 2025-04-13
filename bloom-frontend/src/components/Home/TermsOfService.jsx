import React from 'react';

const TermsOfService = () => {
  const styles = {
    wrapper: {
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      padding: '40px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.7',
      color: '#333',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: '#2a9d8f',
    },
    sectionTitle: {
      fontSize: '1.4rem',
      marginTop: '25px',
      color: '#264653',
    },
    paragraph: {
      marginBottom: '15px',
    },
    footer: {
      marginTop: '40px',
      fontSize: '0.9rem',
      color: '#777',
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Terms of Service</h1>

        <p style={styles.paragraph}>
          Welcome to BLOOM. These Terms of Service govern your use of our website and services.
        </p>

        <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
        <p style={styles.paragraph}>
          By accessing or using BLOOM, you agree to be bound by these terms.
        </p>

        <h2 style={styles.sectionTitle}>2. User Responsibilities</h2>
        <p style={styles.paragraph}>
          You are responsible for keeping your account details confidential.
        </p>

        <h2 style={styles.sectionTitle}>3. Content</h2>
        <p style={styles.paragraph}>
          You retain ownership of your content but grant BLOOM rights to display and use it.
        </p>

        <h2 style={styles.sectionTitle}>4. Changes</h2>
        <p style={styles.paragraph}>
          Terms may change over time. Continued use indicates acceptance of updates.
        </p>

        <div style={styles.footer}>Last updated: April 13, 2025</div>
      </div>
    </div>
  );
};

export default TermsOfService;
