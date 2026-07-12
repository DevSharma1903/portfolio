import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projectsData = [
    {
      title: 'Optimum Notes',
      image: '/ed.jpg',
      description: '- Local Browser App\n- JavaScript\n- No tracking\n- Status: Deployed',
      link: 'https://optimum-notes.vercel.app/'
    },
    {
      title: 'InvestSure',
      image: '/ed (1).jpg',
      description: '- Financial Web App\n- Compares SIP vs FD vs RD\n- Gemini API + Translate API integration\n- Status: Not Deployed',
      link: 'https://github.com/DevSharma1903/FinHack'
    },
    {
      title: 'College Management System',
      image: '/college.jpg',
      description: '- MySql + HTML, CSS, JavaScript\n- CRUD Operations, History tracking\n- Made for an in-course project\n- Status: Not Deployed',
      link: 'https://github.com/DevSharma1903/College-Managment-Webpage'
    }
  ];

  return (
    <div className="container page-transition" style={{ maxWidth: '1200px' }}>
      <h2 className="page-title">projects<span className="blinker">_</span></h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '30px',
        marginBottom: '40px'
      }}>
        {projectsData.map((proj, idx) => (
          <div key={idx} style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              width: '100%',
              height: '200px',
              backgroundImage: `url('${proj.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#333'
            }} />
            
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4em', marginBottom: '12px' }}>{proj.title}</h3>
              <div style={{ flex: 1, marginBottom: '20px' }}>
                {proj.description.split('\n').map((line, i) => (
                  <p key={i} className="text-body" style={{ margin: 0, fontSize: '0.95em' }}>{line}</p>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 24px' }}>
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn-primary" style={{ width: '150px' }}>back</Link>
      </div>
    </div>
  );
};

export default Projects;
