import { Career } from "@/types/career";

export const careersMock: Career[] = [
  {
    id: "1",
    company: "Ômega Screen Indústria",
    company_logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGOFOwukbCi5g/company-logo_200_200/company-logo_200_200/0/1669890865489/mega_indstria_e_comrcio_de_tintas_ltda_logo?e=1746662400&v=beta&t=riQ6QdLEHo5OfSNvkWktxfjDLrELbBTnP131ayLhBvI",
    name: "Analista de des. de software",
    start_date: "01/08/2023",
    end_date: "",
    type: "Presencial",
    description: "Responsável pelo desenvolvimento de aplicações web, criação de protótipos, hospedagem, manutenção e análise de desempenho dos sites. Utilizando ferramentas de desenvolvimento modernas como Next.js, NestJS, além de conceitos como SOLID e TDD, para criar aplicações seguras, robustos e escaláveis.",
    competencias: [
      "Node.js",
      "Next.js",
      "Git",
      "SQL",
      "MongoBD",
      "TypeScript",
      "Nest.js",
      "Jest",
      "Figma",
      "Mantine-UI",
    ]
  },
  {
    id: "2",
    company: "Freelancer",
    company_logo: "",
    name: "Desenvolvedor Web Fullstack",
    start_date: "01/02/2023",
    end_date: "",
    type: "Remota",
    description: "Responsável pelo desenvolvimento completo, desde a protótipagem até a hospedagem e manutenção. Já desenvolvi CMS's personalizados, APIs RESTful e WebSocket, painéis de usuário interativos, sistemas de cotação industrial, automações inteligentes, ferramentas de raspagem de dados e Landing Pages otimizadas.",
    competencias: [
      "Node.js",
      "Next.js",
      "Git",
      "SQL",
      "MongoBD",
      "TypeScript",
      "Nest.js",
      "Docker",
      "Jest",
      "Figma",
      "Mantine-UI",
      "GSAP",
      "Web Socket",
      "Web Scraping",
      "Playwright",
    ]
  },
];
