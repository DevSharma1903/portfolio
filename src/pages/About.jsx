import React from 'react';
import { Link } from 'react-router-dom';
import GitHubHeatmap from '../components/GitHubHeatmap';
import DeveloperMetrics from '../components/DeveloperMetrics';

const About = () => {
  return (
    <div className="container page-transition" style={{ maxWidth: '820px' }}>
      <div className="box-container" style={{ padding: '36px 32px' }}>
        <h2 className="page-title" style={{ marginBottom: '24px' }}>
          about<span className="blinker"></span>
        </h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p className="text-body">
            Hello, it's Dev. I'm a sophomore at MIT Manipal pursuing Computer Science and Financial Technology.
          </p>
          
          <p className="text-body">
            I build systems across Artificial Intelligence, quantitative analytics, and full-stack software development. Currently engineering real-time rocket payload telemetry and avionics embedded software at <strong>thrustMIT</strong>.
          </p>

          <p className="text-body" style={{ margin: 0 }}>
            In my spare time, I explore 3D modeling in Blender, game mechanics in Unity, and competitive hackathon challenges.
          </p>
        </div>

        {/* Live Developer Telemetry & Languages Breakdown */}
        <DeveloperMetrics />

        {/* GitHub Commit Heat Graph */}
        <GitHubHeatmap username="DevSharma1903" />
        
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/" className="btn-primary" style={{ width: '150px' }}>back</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
