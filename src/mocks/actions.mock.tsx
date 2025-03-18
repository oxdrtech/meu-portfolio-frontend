import { SpotlightActionData } from "@mantine/spotlight";
import { IconBrandGithub, IconBrandLinkedin, IconCode, IconCopy, IconDownload, IconMail } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { useMemo } from "react";
import CustomNotification from "@/components/_ui/notification/customNotification";

const useActionsHandlers = () => {
  const clipboard = useClipboard();

  const copyLink = (url: string) => {
    clipboard.copy(url);
    CustomNotification({ title: "Sucesso", message: "Link copiado 👍" });
    setTimeout(() => clipboard.reset(), 3000);
  };

  const downloadCV = (filePath: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = `andre-campos-cv${new Date().getFullYear()}.pdf`;
    link.click();
  };

  const openTo = (link: string) => {
    window.open(link, "_blank");
  };

  return useMemo(
    () => ({
      copyLink: () => copyLink(window.location.href),
      downloadCV: () => downloadCV("./andre-campos-cv.pdf"),
      openToLinkedin: () => openTo("https://www.linkedin.com/in/oxdrtech"),
      openToGithub: () => openTo("https://github.com/oxdrtech"),
      openToEmail: () => openTo("mailto:andreescampos@gmail.com"),
      openToCode: () => openTo("https://github.com/oxdrtech/meu-portfolio-frontend"),
    }),
    []
  );
};

export const useActions = () => {
  const handlers = useActionsHandlers();

  return useMemo<SpotlightActionData[]>(() => {
    return [
      {
        id: "link",
        label: "Link",
        description: "Copiar endereço da pagina",
        onClick: handlers.copyLink,
        leftSection: <IconCopy size={22} />,
      },
      {
        id: "curriculo",
        label: "Currículo",
        description: "Baixar meu currículo",
        onClick: handlers.downloadCV,
        leftSection: <IconDownload size={22} />,
      },
      {
        id: "linkedin",
        label: "Linkedin",
        description: "Visitar meu linkedin",
        onClick: handlers.openToLinkedin,
        leftSection: <IconBrandLinkedin size={22} />,
      },
      {
        id: "github",
        label: "Github",
        description: "Visitar meu github",
        onClick: handlers.openToGithub,
        leftSection: <IconBrandGithub size={22} />,
      },
      {
        id: "email",
        label: "Email",
        description: "Enviar um email",
        onClick: handlers.openToEmail,
        leftSection: <IconMail size={22} />,
      },
      {
        id: "codigo",
        label: "Código",
        description: "Ver código deste site",
        onClick: handlers.openToCode,
        leftSection: <IconCode size={22} />,
      },
    ];
  }, [handlers]);
};
