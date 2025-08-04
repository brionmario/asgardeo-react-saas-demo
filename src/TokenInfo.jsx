import React, { useState, useEffect } from 'react';
import './TokenInfo.css';

const TokenInfo = () => {
  const [sessionData, setSessionData] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const findSessionData = () => {
      // Find session storage key that matches the pattern
      const sessionKey = Object.keys(sessionStorage).find(key => 
        key.startsWith('session_data-instance_')
      );
      
      if (sessionKey) {
        const data = sessionStorage.getItem(sessionKey);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            setSessionData(parsedData);
            
            // Decode the ID token if present
            if (parsedData.id_token) {
              const decoded = decodeJWT(parsedData.id_token);
              setDecodedToken(decoded);
            }
          } catch (error) {
            console.error('Error parsing session data:', error);
          }
        }
      }
    };

    findSessionData();
    
    // Set up an interval to check for changes (optional)
    const interval = setInterval(findSessionData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const highlightJSON = (jsonString) => {
    return jsonString
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match, p1) => {
        if (/:$/.test(p1)) {
          return `<span class="json-key">${p1.slice(0, -1)}</span><span class="json-punctuation">:</span>`;
        }
        return `<span class="json-string">${p1}</span>`;
      })
      .replace(/\b(-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/g, '<span class="json-number">$1</span>')
      .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
      .replace(/\bnull\b/g, '<span class="json-null">null</span>')
      .replace(/([{}[\],])/g, '<span class="json-punctuation">$1</span>');
  };

  const renderSessionData = () => {
    if (!sessionData) return <p>No session data found</p>;

    // Format the session data with readable timestamps
    const formattedData = { ...sessionData };
    if (formattedData.created_at) {
      formattedData.created_at_readable = formatDate(formattedData.created_at / 1000);
    }

    const jsonString = JSON.stringify(formattedData, null, 2);
    const highlightedJSON = highlightJSON(jsonString);

    return (
      <div className="data-content">
        <pre 
          className="json-display"
          dangerouslySetInnerHTML={{ __html: highlightedJSON }}
        />
      </div>
    );
  };

  const renderDecodedToken = () => {
    if (!decodedToken) return <p>No decoded token available</p>;

    // Format the decoded token with readable timestamps
    const formattedToken = { ...decodedToken };
    ['exp', 'iat', 'nbf'].forEach(key => {
      if (formattedToken[key]) {
        formattedToken[`${key}_readable`] = formatDate(formattedToken[key]);
      }
    });

    const jsonString = JSON.stringify(formattedToken, null, 2);
    const highlightedJSON = highlightJSON(jsonString);

    return (
      <div className="data-content">
        <pre 
          className="json-display"
          dangerouslySetInnerHTML={{ __html: highlightedJSON }}
        />
      </div>
    );
  };

  return (
    <div className="token-info-container">
      <h1>Token Information</h1>
      <div className="cards-container">
        <div className="card">
          <h2>Session</h2>
          {renderSessionData()}
        </div>
        <div className="card">
          <h2>Decoded ID Token</h2>
          {renderDecodedToken()}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;