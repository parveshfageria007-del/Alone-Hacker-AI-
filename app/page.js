'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! Main aapka personal AI assistant hoon. Main aapke sawalon ke jawab de sakta hoon, internet par search kar sakta hoon aur images bhi generate kar sakta hoon. Poochhiye kya poochna hai?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Aap apni Gemini API Key yahan daal sakte hain
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 

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

    // 1. IMAGE GENERATION TRIGGER (Agar user 'generate image' ya 'photo banao' likhe)
    if (userText.toLowerCase().includes('image') || userText.toLowerCase().includes('photo') || userText.toLowerCase().includes('banao')) {
      setTimeout(() => {
        const query = encodeURIComponent(userText.replace(/(generate|image|photo|banao|make|draw)/gi, '').trim());
        const imageUrl = `https://pollinations.ai/p/${query || 'beautiful_scenery'}?width=500&height=500&enhance=true`;
        
        setMessages((prev) => [...prev, { 
          role: 'ai', 
          text: `Aapke kehne par maine image generate kar di hai:`,
          image: imageUrl 
        }]);
        setLoading(false);
      }, 1500);
      return;
    }

    // 2. REAL AI RESPONSE (Gemini Connect)
    try {
      // Agar API key nahi hai, toh automatic smart internet search system use hoga
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userText)}?model=searchgpt&system=You are a helpful, smart AI assistant like Gemini and ChatGPT. Give clear, simple, and accurate answers in Hindi/Hinglish as per user language. If asked for latest info, use your web search capabilities.`);
      const data = await response.text();

      setMessages((prev) => [...prev, { role: 'ai', text: data }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Sorry bhai, network issue ki wajah se connect nahi ho paya. Ek baar internet check karein.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      backgroundColor: '#f4f6f9', color: '#333', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Premium ChatGPT Style Header */}
      <div style={{
        backgroundColor: '#ffffff', padding: '15px', textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)', borderBottom: '1px solid #e0e0e0'
      }}>
        <h1 style={{ fontSize: '1.3rem', margin: 0, color: '#1a73e8', fontWeight: '600' }}>Smart Gemini AI</h1>
        <small style={{ color: '#666', fontSize: '0.8rem' }}>Online • Internet Search & Image Active</small>
      </div>

      {/* Clean Chat Space */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '15px', backgroundColor: '#f8f9fa'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '15px'
          }}>
            <div style={{
              maxWidth: '85%', padding: '12px 16px', borderRadius: '18px',
              fontSize: '1rem', lineHeight: '1.5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              backgroundColor: msg.role === 'user' ? '#1a73e8' : '#ffffff',
              color: msg.role === 'user' ? '#ffffff' : '#333333',
              borderRadius: msg.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            }}>
              <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              {msg.image && (
                <img src={msg.image} alt="AI Generated" style={{
                  width: '100%', borderRadius: '10px', marginTop: '10px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }} />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '18px', color: '#666', fontSize: '0.9rem' }}>
              AI soch raha hai aur internet search kar raha hai...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Modern Compact Input Box */}
      <form onSubmit={handleSend} style={{
        display: 'flex', padding: '12px', backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0', gap: '8px', alignItems: 'center'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Kuch bhi poochhein ya 'cat image banao' likhein..."
          style={{
            flex: 1, backgroundColor: '#f1f3f4', border: 'none',
            color: '#333', padding: '12px 18px', borderRadius: '24px',
            fontSize: '1rem', outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#1a73e8', color: '#fff', border: 'none',
            padding: '12px 22px', borderRadius: '24px', fontSize: '0.9rem',
            fontWeight: 'bold', cursor: 'pointer', transition: '0.2s',
            opacity: loading ? 0.6 : 1
          }}
        >
          SEND
        </button>
      </form>
    </div>
  );
          }
        
