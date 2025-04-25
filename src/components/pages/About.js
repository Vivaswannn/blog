import React from 'react';
import { useParams } from 'react-router-dom';
import './About.css';
import { FaGraduationCap, FaUsers, FaBook, FaLightbulb, FaBriefcase } from 'react-icons/fa';

const About = () => {
  const { section } = useParams();
  
  const renderMission = () => (
    <div className="about-section">
      <div className="section-header">
        <FaGraduationCap className="section-icon" />
        <h2>Our Mission</h2>
      </div>
      <p>At Educational Resource Blog, our mission is to democratize access to high-quality educational resources for everyone. We believe that education is a fundamental right and that knowledge should be accessible to all, regardless of geographical location or economic background.</p>
      
      <div className="mission-values">
        <div className="mission-value-card">
          <FaLightbulb />
          <h3>Inspire Learning</h3>
          <p>We aim to ignite curiosity and foster a love for lifelong learning through engaging, accessible content.</p>
        </div>
        
        <div className="mission-value-card">
          <FaUsers />
          <h3>Build Community</h3>
          <p>We create spaces where educators and learners can connect, collaborate, and grow together.</p>
        </div>
        
        <div className="mission-value-card">
          <FaBook />
          <h3>Share Knowledge</h3>
          <p>We facilitate the exchange of ideas and resources to enrich educational experiences worldwide.</p>
        </div>
      </div>
      
      <div className="mission-goals">
        <h3>Our Goals</h3>
        <ul>
          <li>Provide free access to high-quality educational materials across various subjects</li>
          <li>Support teachers and facilitators with resources that enhance their teaching</li>
          <li>Foster a community of learners who can share and benefit from each other's knowledge</li>
          <li>Make learning engaging, interactive, and accessible for people of all ages</li>
        </ul>
      </div>
    </div>
  );
  
  const renderTeam = () => (
    <div className="about-section">
      <div className="section-header">
        <FaUsers className="section-icon" />
        <h2>Our Team</h2>
      </div>
      <p>Our diverse team of educators, developers, and content creators is passionate about making education accessible and engaging for everyone.</p>
      
      <div className="team-grid">
        <div className="team-member">
          <div className="member-photo" style={{backgroundColor: '#e6f7ff'}}>JD</div>
          <h3>Jane Doe</h3>
          <p className="member-title">Founder & Educational Director</p>
          <p>Former high school teacher with 15 years of experience, Jane leads our content strategy with passion for accessible education.</p>
        </div>
        
        <div className="team-member">
          <div className="member-photo" style={{backgroundColor: '#fff9e6'}}>JS</div>
          <h3>John Smith</h3>
          <p className="member-title">Lead Developer</p>
          <p>Full-stack developer with a background in educational technology, John ensures our platform is intuitive and accessible.</p>
        </div>
        
        <div className="team-member">
          <div className="member-photo" style={{backgroundColor: '#f0f7ff'}}>AJ</div>
          <h3>Alex Johnson</h3>
          <p className="member-title">Content Curator</p>
          <p>With a PhD in Education, Alex oversees content quality and develops our resource evaluation framework.</p>
        </div>
        
        <div className="team-member">
          <div className="member-photo" style={{backgroundColor: '#f6f6f6'}}>MP</div>
          <h3>Maria Perez</h3>
          <p className="member-title">Community Manager</p>
          <p>Maria builds relationships with educators worldwide and fosters our growing community of learners and teachers.</p>
        </div>
      </div>
    </div>
  );
  
  const renderStory = () => (
    <div className="about-section">
      <div className="section-header">
        <FaBook className="section-icon" />
        <h2>Our Story</h2>
      </div>
      
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">2020</div>
          <div className="timeline-content">
            <h3>The Beginning</h3>
            <p>Educational Resource Blog was founded by Jane Doe, a high school teacher who recognized the need for quality educational resources that were easily accessible to all.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2021</div>
          <div className="timeline-content">
            <h3>Growth and Development</h3>
            <p>Our platform expanded to include more topics and resources, and we began partnering with educators worldwide to enhance our content library.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2022</div>
          <div className="timeline-content">
            <h3>Community Focus</h3>
            <p>We introduced community features that allowed educators to connect, share, and collaborate on resources, enhancing the learning experience.</p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-date">2023</div>
          <div className="timeline-content">
            <h3>Where We Are Today</h3>
            <p>Today, Educational Resource Blog serves thousands of educators and learners across the globe, continuing our mission to make quality education accessible to all.</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCareers = () => (
    <div className="about-section">
      <div className="section-header">
        <FaBriefcase className="section-icon" />
        <h2>Careers</h2>
      </div>
      <p>Join our team of passionate educators and technologists dedicated to transforming education through accessible resources.</p>
      
      <div className="careers-intro">
        <h3>Why Work With Us?</h3>
        <ul>
          <li>Make a real impact on education globally</li>
          <li>Flexible work environment with remote options</li>
          <li>Collaborative team culture that values innovation</li>
          <li>Continuous learning and professional development opportunities</li>
        </ul>
      </div>
      
      <div className="job-openings">
        <h3>Current Openings</h3>
        
        <div className="job-card">
          <h4>Educational Content Developer</h4>
          <p className="job-type">Full-time | Remote</p>
          <p>Create engaging, accessible educational resources in your area of expertise.</p>
          <button className="apply-btn">View Details</button>
        </div>
        
        <div className="job-card">
          <h4>UX/UI Designer</h4>
          <p className="job-type">Full-time | Hybrid</p>
          <p>Design intuitive, accessible interfaces that enhance the learning experience.</p>
          <button className="apply-btn">View Details</button>
        </div>
        
        <div className="job-card">
          <h4>Community Engagement Specialist</h4>
          <p className="job-type">Part-time | Remote</p>
          <p>Build and nurture our community of educators and learners.</p>
          <button className="apply-btn">View Details</button>
        </div>
      </div>
    </div>
  );
  
  const renderDefault = () => (
    <>
      <div className="about-hero">
        <h1>About Educational Resource Blog</h1>
        <p>Empowering educators and learners through accessible, high-quality resources</p>
      </div>
      
      {renderMission()}
      
      <div className="about-cta">
        <h2>Join Our Community</h2>
        <p>Be part of a growing network of educators and learners sharing knowledge worldwide.</p>
        <button className="cta-button">Sign Up Today</button>
      </div>
    </>
  );
  
  const renderContent = () => {
    switch(section) {
      case 'mission':
        return renderMission();
      case 'team':
        return renderTeam();
      case 'story':
        return renderStory();
      case 'careers':
        return renderCareers();
      default:
        return renderDefault();
    }
  };
  
  return (
    <div className="about-container">
      {renderContent()}
    </div>
  );
};

export default About; 