import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container page-transition">
      <div className="box-container" style={{ maxWidth: '700px' }}>
        <h2 className="page-title">about<span className="blinker">_</span></h2>
        
        <div style={{ textAlign: 'justify', marginBottom: '40px' }}>
          <p className="text-body">
            Hello, it's Dev. I'm a second year student at MIT Manipal, pursuing Computer Science and Financial Technology.
          </p>
          
          <p className="text-body">
            I often work in the fields of Artificial Intelligence and Full-Stack development.
          </p>

          <p className="text-body">
            I also run a YouTube channel, that you can find <a href="https://www.youtube.com/@geniusapple6471" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>here</a>.
          </p>

          <p className="text-body">
            When I'm in the mood, I love living in the world of 3D Modelling in Blender and Game Development in Unity.
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="btn-primary" style={{ width: '150px' }}>back</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
