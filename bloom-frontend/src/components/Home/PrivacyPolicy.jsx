import React from 'react';

const PrivacyPolicy = () => {
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
      color: '#e76f51',
    },
    sectionTitle: {
      fontSize: '1.4rem',
      marginTop: '25px',
      color: '#6a4c93',
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
        <h1 style={styles.heading}>Privacy Policy</h1>

        <p style={styles.paragraph}>
          Your privacy matters to us. This policy explains how BLOOM collects, uses, and protects your personal information.
        </p>

        <h2 style={styles.sectionTitle}>1. Data Collection</h2>
        <p style={styles.paragraph}>
          We collect basic account details and shared content to improve your experience.
        </p>

        <h2 style={styles.sectionTitle}>2. Use of Information</h2>
        <p style={styles.paragraph}>
          Your data helps us personalize your journey and connect you with community content.
        </p>

        <h2 style={styles.sectionTitle}>3. Sharing</h2>
        <p style={styles.paragraph}>
          We do not sell your data. Limited data may be shared with essential third-party services.
        </p>

        <h2 style={styles.sectionTitle}>4. Security</h2>
        <p style={styles.paragraph}>
          We use secure practices and tools to protect your information.
        </p>

        <div style={styles.footer}>Last updated: April 13, 2025</div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
