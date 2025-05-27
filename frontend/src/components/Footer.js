import React from 'react';

const Footer = () => (
  <footer style={{
    width: '100%',
    textAlign: 'center',
    padding: '1rem 0',
    background: 'transparent',
    color: '#888',
    fontSize: '1rem',
    left: 0,
    bottom: 0,
    zIndex: 100
  }}>
    © {new Date().getFullYear()} Basmala Moustafa
  </footer>
);

export default Footer;