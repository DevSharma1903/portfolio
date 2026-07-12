import React from 'react';
import { Link } from 'react-router-dom';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', skills: 'Python • JavaScript • C • SQL • PLSQL • Java' },
    { title: 'Web Development', skills: 'Frontend: React, HTML/CSS, JavaScript\nBackend: Spring Boot' },
    { title: 'AI/Machine Learning', skills: 'Frameworks: TensorFlow, Keras, PyTorch, scikit-learn\nComputer Vision: OpenCV, YOLO, CNN, Deep Learning' },
    { title: 'Databases & Cloud', skills: 'MySQL • Azure Cloud' },
    { title: 'Embedded Systems', skills: 'Hardware: Raspberry Pi • Arduino • ESP32\nSensors: TOF • Hall-effect • IMU\nProtocols: I2C' },
    { title: 'Tools & Platforms', skills: 'Version Control: Git, GitHub\nDevelopment: VS Code, Kaggle, Colab' },
    { title: 'Additional', skills: 'Video processing • Servo control systems\nVideo editing • Blender (3D Modeling)\nUnity (Game Development)' }
  ];

  const certifications = [
    { title: 'Convolutional Neural Networks', org: 'DeepLearning.AI', date: 'Feb 2025', id: 'U5RSRJISYYLD', link: 'https://coursera.org/verify/U5RSRJISYYLD' },
    { title: 'Neural Networks and Deep Learning', org: 'DeepLearning.AI', date: 'Feb 2025', id: 'K2ZAUPXBXIJ3', link: 'https://coursera.org/verify/K2ZAUPXBXIJ3' },
    { title: 'Introduction to Front-End Development', org: 'Meta', date: 'Dec 2025', id: 'E2X96FE0ILT3', link: 'https://coursera.org/verify/E2X96FE0ILT3' },
    { title: 'Improving Deep Neural Networks', org: 'DeepLearning.AI', date: 'Apr 2025', id: 'GHDICLD6HLGM', link: 'https://coursera.org/verify/GHDICLD6HLGM' },
    { title: 'Structuring Machine Learning Projects', org: 'DeepLearning.AI', date: 'Apr 2025', id: 'Q3DQ5FMYHE5P', link: 'https://coursera.org/verify/Q3DQ5FMYHE5P' }
  ];

  return (
    <div className="container page-transition" style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        
        {/* Skills Column */}
        <div className="box-container" style={{ margin: 0, height: '100%' }}>
          <h2 className="page-title">skills<span className="blinker">_</span></h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {skillCategories.map((cat, idx) => (
              <div key={idx} style={{ borderBottom: idx !== skillCategories.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx !== skillCategories.length - 1 ? '20px' : '0' }}>
                <h3 style={{ color: 'var(--accent-color)', marginBottom: '10px', fontSize: '1.2em' }}>{cat.title}</h3>
                {cat.skills.split('\n').map((line, i) => (
                  <p key={i} className="text-body" style={{ margin: '5px 0' }}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="box-container" style={{ margin: 0, height: '100%' }}>
          <h2 className="page-title">certifications<span className="blinker">_</span></h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid var(--border-color)', 
                padding: '20px', 
                borderRadius: '8px' 
              }}>
                <h3 style={{ fontSize: '1.1em', marginBottom: '5px' }}>{cert.title}</h3>
                <p style={{ color: 'var(--accent-color)', fontSize: '0.9em', marginBottom: '10px' }}>{cert.org}</p>
                <p className="text-body" style={{ fontSize: '0.85em', margin: '2px 0' }}>Issued: {cert.date}</p>
                <p className="text-body" style={{ fontSize: '0.85em', margin: '2px 0', marginBottom: '15px' }}>ID: {cert.id}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.9em' }}>
                  Show Credential
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/" className="btn-primary" style={{ width: '150px' }}>back</Link>
      </div>
    </div>
  );
};

export default Skills;
