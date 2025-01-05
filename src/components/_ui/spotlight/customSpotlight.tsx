import { useClipboard } from "@mantine/hooks";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { IconBrandGithub, IconBrandLinkedin, IconCode, IconCopy, IconDownload, IconMail, IconSearch } from "@tabler/icons-react";

export default function CustomSpotlight() {
  const clipboard = useClipboard();

  const copyLink = () => {
    clipboard.copy(window.location.href)
    // TODO - adicionar disparo de notification
  };

  const downloadCV = (filePath: string) => {
    return () => {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = 'adnre-campos-cv2025.pdf';
      link.click();
    }
  };

  const openTo = (link: string) => {
    return () => {
      window.open(link, "_blank")
    }
  };

  const actions: SpotlightActionData[] = [
    {
      id: "link",
      label: "Link",
      description: "Copiar endereço desta pagina",
      onClick: copyLink,
      leftSection: <IconCopy size={22} />,
    },
    {
      id: "curriculo",
      label: "Currículo",
      description: "Baixar meu currículo",
      onClick: downloadCV("./andre-campos-cv2025.pdf"),
      leftSection: <IconDownload size={22} />,
    },
    {
      id: "linkedin",
      label: "Linkedin",
      description: "Visitar meu linkedin",
      onClick: openTo("https://www.linkedin.com/in/ddr23"),
      leftSection: <IconBrandLinkedin size={22} />,
    },
    {
      id: "github",
      label: "Github",
      description: "Visitar meu github",
      onClick: openTo("https://github.com/DDR23"),
      leftSection: <IconBrandGithub size={22} />,
    },
    {
      id: "email",
      label: "Email",
      description: "Enviar um email",
      onClick: openTo("mailto:andreescampos@gmail.com"),
      leftSection: <IconMail size={22} />,
    },
    {
      id: "codigo",
      label: "Codigo",
      description: "Ver código deste site",
      onClick: openTo("https://github.com/DDR23/meu-portfolio"),
      leftSection: <IconCode size={22} />,
    },
  ];

  return (
    <Spotlight
      actions={actions}
      nothingFound="Não encontrado..."
      highlightQuery
      shortcut={"ctrl+enter"}
      searchProps={{
        leftSection: <IconSearch size={22} />,
        placeholder: "Pesquisar...",
      }}
    />
  );
}
