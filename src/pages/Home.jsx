import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container page-transition" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh'
    }}>
      <div className="box-container" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="page-title" style={{ marginBottom: '20px' }}>
          Dev Sharma<span className="blinker">|</span>
        </h2>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="text-body" style={{ margin: '5px 0' }}>sophomore at MIT, Manipal</p>
          <p className="text-body" style={{ margin: '5px 0' }}>[working at thrustMIT]</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <Link to="/about" className="btn-primary" style={{ width: '200px' }}>about</Link>
          <Link to="/skills" className="btn-primary" style={{ width: '200px' }}>skills</Link>
          <Link to="/projects" className="btn-primary" style={{ width: '200px' }}>projects</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
