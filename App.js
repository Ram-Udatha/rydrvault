import React, { useState } from 'react';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    if (phone.length === 10) {
      setScreen('otp');
    } else {
      alert('Please enter a 10-digit phone number');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setScreen('home');
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };

  const handleLogout = () => {
    setPhone('');
    setOtp('');
    setScreen('login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#000000',
        padding: '20px',
        boxShadow: '0 0 20px rgba(255, 140, 0, 0.3)',
        borderRadius: '8px',
      }}>
        {screen === 'login' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#FF8C00',
              marginBottom: '30px',
            }}>🏢</div>
            <h1 style={{ color: '#FF8C00', marginBottom: '30px' }}>RYDRVAULT</h1>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', textAlign: 'left', color: '#999' }}>
                Phone Number
              </label>
              <input
                type="tel"
                maxLength="10"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
            </div>

            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#FF8C00',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Send OTP
            </button>
          </div>
        )}

        {screen === 'otp' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#FF8C00', marginBottom: '20px' }}>Verify OTP</h2>
            <p style={{ color: '#999', marginBottom: '20px' }}>
              Sent to +91 {phone}
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', textAlign: 'left', color: '#999' }}>
                OTP Code
              </label>
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#FF8C00',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Verify OTP
            </button>

            <button
              onClick={() => setScreen('login')}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'transparent',
                color: '#FF8C00',
                border: '1px solid #FF8C00',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              Back
            </button>
          </div>
        )}

        {screen === 'home' && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#FF8C00', marginBottom: '20px' }}>Welcome!</h1>
            <p style={{ color: '#999', marginBottom: '30px' }}>
              Phone: +91 {phone}
            </p>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <h3 style={{ color: '#FF8C00', marginBottom: '15px' }}>Categories</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['🚗', '⚙️', '🛠️', '📦', '🔧', '💡'].map((emoji, i) => (
                  <div key={i} style={{
                    padding: '15px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '6px',
                    border: '1px solid #333333',
                  }}>
                    <span style={{ fontSize: '24px' }}>{emoji}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#FF8C00',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
