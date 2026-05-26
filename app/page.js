import React from 'react';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      fontFamily: 'monospace',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', textShadow: '0 0 10px #00ff00' }}>
        Alone Hacker AI
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#ffffff', maxWidth: '600px', marginBottom: '30px' }}>
        Welcome to your secure AI development workspace. The system environment has been successfully configured.
      </p>
      <div style={{
        border: '1px solid #00ff00',
        padding: '15px 30px',
        borderRadius: '5px',
        boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
        fontSize: '1rem'
      }}>
        System Status: Operational
      </div>
    </div>
  );
}
