// src/data/projectData.js
export const projects = [
    {
      id: 'llm-debate',
      title: 'LLM Debate Project',
      short: 'A multi-model debate simulator using LangChain and LLM APIs.',
      description: `Developed a multi-model debate application to simulate structured arguments between AI models. Includes a CLI prototype with user-customizable settings (temperature, formality) and a frontend in progress. Designed with modularity and expandability in mind.`,
      stack: ['LangChain', 'React', 'OpenAI API', 'Node.js'],
      links: {
        github: 'https://github.com/yourrepo',
        demo: ''
      },
      images: []
    },
    {
      id: 'tree-org',
      title: 'Tree.org',
      short: 'Team project built with Angular and Spring Boot for class.',
      description: `A single-page application built with a 4-person team, using Angular on the frontend and Spring Boot on the backend. Followed Agile practices and reached 90% unit test coverage for core features.`,
      stack: ['Angular', 'Spring Boot', 'Java', 'TypeScript'],
      links: {
        github: '',
        demo: ''
      },
      images: []
    }
  ];