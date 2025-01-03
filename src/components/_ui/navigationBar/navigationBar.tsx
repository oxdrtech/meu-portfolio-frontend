import { ActionIcon, Flex, UnstyledButton } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

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
]

export default function NavigationBar() {
  return (
    <Flex pos={"fixed"} w={"100vw"} h={"100vh"} justify={"space-between"} px={"lg"} style={{
      zIndex: 100
    }}>
      <Flex direction={"column"} mt={"100"} gap={"md"}>
        {links.map((link, index) => {
          const { hovered, ref } = useHover();
          return (
            <ActionIcon
              variant="transparent"
              key={index}
              ref={ref}
              fz={"sm"}
              c={hovered ? 'defaultColor' : 'white'}
              component="a"
              href={link.url}
              target="_blank"
            >
              <link.icon size={22} />
            </ActionIcon>
          );
        })}
      </Flex>
      <Flex direction={"column"} w={"max-content"} mt={"100"} gap={"md"} px={"md"}>
        {indices.map((indice, index) => (
          <UnstyledButton component="a" href={`#${indice.target}`} ta={"end"} key={index}>{indice.label}</UnstyledButton>
        ))}
      </Flex>
    </Flex>
  );
}
