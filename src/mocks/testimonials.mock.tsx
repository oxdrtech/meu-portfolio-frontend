import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export const testimonialsMock = [
  {
    name: "Júlio Moraes",
    picture: "./testimonialsPhotos/julioPicture.webp",
    socials: [
      {
        icon: IconBrandLinkedin,
        url: "https://www.linkedin.com/in/julio-cesarm/",
      },
      {
        icon: IconBrandGithub,
        url: "https://github.com/juliocesardemoraes",
      },
    ],
    position: "Senior Fullstack Developer",
    company: "Zeus Tech",
    companyLogo: "./testimonialsPhotos/julioCompany.webp",
    feedback: "O André é um dos desenvolvedores mais talentosos com quem já tive o prazer de trabalhar. Todos os trabalhos que solicitei a ele foram muito bem entregues, mesmo sendo desafios complexos e em diversas áreas, como frontend, backend, banco de dados e deploy. Altamente recomendado!",
  },
  {
    name: "Hortência Santiago",
    picture: "./testimonialsPhotos/hortenciaPicture.webp",
    socials: [
      {
        icon: IconBrandLinkedin,
        url: "https://www.linkedin.com/in/hort%C3%AAncia-santiago-7609a518a/",
      },
    ],
    position: "Analista de Marketing",
    company: "Ômega Screen Indústria",
    companyLogo: "./testimonialsPhotos/hortenciaCompany.webp",
    feedback: (
      <>
        Foi de extrema importância desenvolver esse projeto!<br />
        A construção do site institucional da Ômega, junto com André, os prazos foram cumpridos de maneira precisa e com atenção aos detalhes.
      </>
    ),
  },
  {
    name: "Miguel Romaniw",
    picture: "./testimonialsPhotos/miguelPicture.webp",
    socials: [
      {
        icon: IconBrandLinkedin,
        url: "https://www.linkedin.com/in/miguel-aquelino-romaniw-varnier-neto/",
      },
      {
        icon: IconBrandGithub,
        url: "https://github.com/MiguelRomaniw",
      },
    ],
    position: "Senior Fullstack Developer",
    company: "Space",
    companyLogo: "",
    feedback: "O projeto foi um sucesso absoluto! Ele entendeu perfeitamente nossas necessidades e entregou um sistema funcional e de alta performance. Recomendo fortemente!",
  },
  {
    name: "Laiane Bernardo",
    picture: "./testimonialsPhotos/laianePicture.webp",
    socials: [],
    position: "Licenciatura em História",
    company: "",
    companyLogo: "",
    feedback: "Durante todo o processo de desenvolvimento do meu site, André demonstrou interesse em entregar um trabalho de qualidade e competência. Sempre atento às minhas necessidades enquanto professora, minha pagina ficou linda, superou muito minhas expectativas.",
  },
];
