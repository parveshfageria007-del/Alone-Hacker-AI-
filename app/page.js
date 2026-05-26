'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! Main official Google Gemini AI hoon. Main aapke sabhi sawalon ke bilkul sahi jawab de sakta hoon, live internet search kar sakta hoon aur images bhi bana sakta hoon. Poochhiye kya poochna hai?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Aapki Gemini API Key yahan set ho gayi hai
  const GEMINI_API_KEY = "AIzaSyD78muMfGLTP5Pz4PtrmewoydnZ7UzpraM"; 

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    // 1. IMAGE GENERATION PROTOCOL (Agar user photo banane ko kahe)
    if (userText.toLowerCase().match(/(image|photo|banao|make|draw|picture)/gi)) {
      setTimeout(() => {
        const query = encodeURIComponent(userText.replace(/(generate|image|photo|banao|make|draw|picture|ek|ki)/gi, '').trim());
        const imageUrl = `https://pollinations.ai/p/${query || 'creative_artwork'}?width=500&height=500&enhance=true`;
        
        setMessages((prev) => [...prev, { 
          role: 'ai', 
          text: `Aapke liye image taiyaar hai:`,
          image: imageUrl 
        }]);
        setLoading(false);
      }, 1500);
      return;
    }

    // 2. OFFICIAL GOOGLE GEMINI API CALL
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are Google Gemini, a smart AI assistant. Answer the user clearly, simply, and directly in friendly Hindi/Hinglish language. Avoid long explanations unless asked. User query: ${userText}` }] }]
          })
        }
      );

      const data = await response.json();
      const aiReply = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [...prev, { role: 'ai', text: aiReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Google Gemini server se connect nahi ho paya. Ek baar internet connection check karein.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      backgroundColor: '#f4f6f9', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Premium ChatGPT/Gemini Style Header */}
      <div style={{
        backgroundColor: '#ffffff', padding: '15px', textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)', borderBottom: '1px solid #e0e0e0'
      }}>
        <h1 style={{ fontSize: '1.3rem', margin: 0, color: '#1a73e8', fontWeight: '600' }}>Google Gemini AI</h1>
        <small style={{ color: '#2b6cb0', fontSize: '0.8rem', fontWeight: 'bold' }}>Official Engine • Live Intelligence</small>
      </div>

      {/* Clean Chat Space */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8f9fa' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '15px'
          }}>
            <div style={{
              maxWidth: '85%', padding: '12px 16px', fontSize: '1rem', lineHeight: '1.5',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              backgroundColor: msg.role === 'user' ? '#1a73e8' : '#ffffff',
              color: msg.role === 'user' ? '#ffffff' : '#333333',
              borderRadius: msg.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              {msg.image && (
                <img src={msg.image} alt="AI Generated" style={{
                  width: '100%', borderRadius: '10px', marginTop: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '18px', color: '#666', fontSize: '0.9rem' }}>
              Gemini soch raha hai...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Modern Input Form */}
      <form onSubmit={handleSend} style={{
        display: 'flex', padding: '12px', backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0', gap: '8px', alignItems: 'center'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gemini se kuch bhi poohein..."
          style={{
            flex: 1, backgroundColor: '#f1f3f4', border: 'none',
            color: '#333', padding: '12px 18px', borderRadius: '24px', fontSize: '1rem', outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#1a73e8', color: '#fff', border: 'none',
            padding: '12px 22px', borderRadius: '24px', fontSize: '0.9rem',
            fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.6 : 1
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
                                         }
          
