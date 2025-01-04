import useDevices from "@/hooks/useDevices";
import { ActionIcon, Flex, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const links = [
  { icon: IconBrandLinkedin, url: 'https://www.linkedin.com/in/ddr23/' },
  { icon: IconBrandGithub, url: 'https://github.com/DDR23' }
];

const indices = [
  { target: 'inicio', label: 'Início' },
  { target: 'sobre-mim', label: 'Sobre mim' },
  { target: 'habilidades', label: 'Habilidades' },
  { target: 'projetos', label: 'Projetos' },
  { target: 'contato', label: 'Contato' },
];

interface Props {
  triggerGSAP: boolean;
}

export default function NavigationBar({ triggerGSAP }: Props) {
  const { isDesktop } = useDevices();
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap.utils.toArray(".panel").forEach((panel, index) => {
        gsap.to(`.target-${index + 1}`, {
          color: "#DAFF01",
          scrollTrigger: {
            trigger: panel as gsap.DOMTarget,
            toggleActions: "play reverse play reverse"
          },
        });
      });
    }
  }, [triggerGSAP]);

  return (
    <Flex
      pos={"fixed"}
      w={"100vw"}
      h={"100vh"}
      justify={"space-between"}
      mt={isDesktop ? "100" : "40"}
      px={"lg"}
      style={{
        zIndex: 1,
      }}
    >
      <Flex direction={"column"} gap={"md"}>
        {links.map((link, index) => {
          const { hovered, ref } = useHover();
          return (
            <ActionIcon
              variant="transparent"
              key={index}
              ref={ref}
              fz={"sm"}
              c={hovered ? "defaultColor" : "white"}
              component="a"
              href={link.url}
              target="_blank"
            >
              <link.icon size={22} />
            </ActionIcon>
          );
        })}
      </Flex>
      <Flex direction={"column"} w={"max-content"} gap={0} px={"md"}>
        {indices.map((indice, index) => (
          <UnstyledButton className={`target-${index + 1}`} component="a" href={`#${indice.target}`} ta={"end"} key={index}>

            {indice.label}
          </UnstyledButton>
        ))}
      </Flex>
    </Flex>
  );
}
