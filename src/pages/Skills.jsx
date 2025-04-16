// src/pages/Skills.jsx
export default function Skills() {
    return (
      <section>
        <h2 className="text-2xl font-bold">Skills</h2>
        <h3 className="mt-4 font-semibold">Languages</h3>
        <ul className="list-disc list-inside">
          <li>Python, Java, C/C++, C#, JavaScript, TypeScript, SQL, Swift, HTML, CSS</li>
        </ul>
        <h3 className="mt-4 font-semibold">Tools & Frameworks</h3>
        <ul className="list-disc list-inside">
          <li>Git, GitHub, VS Code, IntelliJ, Xcode, Pycharm, Figma, Trello</li>
          <li>Spring Boot, Angular, SwiftUI, Firebase, MongoDB, MySQL</li>
        </ul>
        <h3 className="mt-4 font-semibold">In Progress</h3>
        <ul className="list-disc list-inside">
          <li>AWS, LangChain, Fullstack AI Integration, DevOps Practices</li>
        </ul>
        <h3 className="mt-4 font-semibold">Certifications & Recognition</h3>
        <ul className="list-disc list-inside">
          <li>CodePath iOS Development (Spring 2024)</li>
          <li>FreeCodeCamp Responsive Web Design (Summer 2024)</li>
          <li>Presidential Scholarship Recipient at RIT</li>
          <li>2nd Place, RIT ClayHacks Hackathon</li>
        </ul>
      </section>
    );
  }