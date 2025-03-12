export interface ResearchProject {
    title: string;
    description: string;
    tags: string[];
    year: number;
    link: string;
    conference: string;
  }
  
  export const researchProjects: ResearchProject[] = [
    {
      title: "Playing to Pay: Interplay of Monetization and Retention Strategies in Mobile Gaming",
      description: "Systematically examines monetization strategies in Korean mobile games, highlighting their prevalence, ethical concerns, and the need for stronger consumer protections.",
      tags: ["Mobile Game Monetization", "Ethical Game Design"],
      year: 2024,
      link: "https://www.overleaf.com/read/cfgsdfnxfrvh#3cdce0",
      conference: "",
    },
  ];