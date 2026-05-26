'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'System Initialized. Alone Hacker AI Operational.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      let aiResponse = 'Command not recognized. Accessing mainframe...';
      const cleanInput = currentInput.toLowerCase().trim();

      if (cleanInput === 'hello' || cleanInput === 'hi') {
        aiResponse = 'Connection established. How can I assist you today, Operator?';
      } else if (cleanInput === 'status') {
        aiResponse = 'All systems green. Firewall secure. Encryption active.';
      } else if (cleanInput === 'help') {
        aiResponse = 'Available protocols: [status] - Check system status, [info] - System configuration.';
      } else if (cleanInput === 'info') {
        aiResponse = 'System: Next.js + Capacitor Environment. Core: Responsive AI Terminal Framework.';
      }

      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);
    }, 800);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      fontFamily: 'monospace',
      padding: '10px'
    }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #00ff00', paddingBottom: '10px', marginBottom: '10px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0, textShadow: '0 0 8px #00ff00' }}>ALONE HACKER AI v1.0</h1>
        <small style={{ color: '#888' }}>SECURE SHELL CONNECTION ACTIVE</small>
      </div>

      {/* Messages Box */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid #222',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#050505',
        marginBottom: '10px'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            marginBottom: '12px',
            lineHeight: '1.4',
            color: msg.role === 'user' ? '#00bfff' : msg.role === 'system' ? '#ffcc00' : '#00ff00'
          }}>
            <span>{msg.role === 'user' ? '>>> User: ' : msg.role === 'system' ? '[SYS]: ' : '>>> AI: '}</span>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your command here..."
          style={{
            flex: 1,
            backgroundColor: '#000',
            border: '1px solid #00ff00',
            color: '#00ff00',
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#00ff00',
            color: '#000',
            border: 'none',
            padding: '0 20px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
    }
      
