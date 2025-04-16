// src/pages/About.jsx
import './About.css';

export default function About() {
  return (
    <section className="about-container">
      <h2 className="about-title">About Me</h2>

      <p className="about-paragraph">
        Hi! I'm Casey — a Computer Science and Economics student at Rochester Institute of Technology. I enjoy building backend systems, tools that help with productivity and organization, and exploring how AI can be used to solve meaningful problems.
      </p>

      <div className="about-section">
        <h3 className="about-subtitle">What I'm Focused On</h3>
        <ul className="about-list">
          <li>Improving my AWS skills for my internship at Liberty Mutual</li>
          <li>Building full-stack tools with React and Spring Boot</li>
          <li>Exploring AI and LLM applications with LangChain</li>
          <li>Becoming more confident in large project structure and design</li>
        </ul>
      </div>

      <div className="about-section">
        <h3 className="about-subtitle">Current Projects</h3>
        <p className="about-paragraph">
          I'm working on a few personal projects, including a gamified task tracker inspired by Solo Leveling, and an LLM-powered debate simulator. These projects help me learn by building things I actually want to use.
        </p>
      </div>

      <div className="about-section">
        <h3 className="about-subtitle">Personal Philosophy</h3>
        <p className="about-paragraph">
          I like thinking about how we can design systems that make it easier for people to focus, feel motivated, and get things done. I build things I’d want to use, and I’m always trying to improve.
        </p>
      </div>
    </section>
  );
}