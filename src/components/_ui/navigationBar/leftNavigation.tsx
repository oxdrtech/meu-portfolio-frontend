import useDevices from "@/hooks/useDevices";
import { useGSAP } from "@gsap/react";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBrandGithub, IconBrandLinkedin, IconSearch } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const links = [
  { icon: IconBrandLinkedin, url: 'https://www.linkedin.com/in/ddr23/' },
  { icon: IconBrandGithub, url: 'https://github.com/DDR23' }
];

const buttons = [
  { icon: IconSearch }
]

interface Props {
  triggerGSAP: boolean;
}

export default function LeftNavigation({ triggerGSAP }: Props) {
  const { isMobile } = useDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap
        .set(".links-animated", {
          display: "flex",
          yPercent: 100,
          opacity: 0,
        });

      gsap
        .timeline()
        .to(".links-animated", {
          delay: 1,
          opacity: 1,
          yPercent: 0,
          duration: .5,
        });
    }
  }, [triggerGSAP]);

  return (
    <Flex ref={gsapRef} pos={"fixed"} w={"max-content"} h={"100vh"} direction={"column"} left={"1rem"} py={isMobile ? "3rem" : "5rem"} justify={"space-between"} style={{ zIndex: 1000 }}>
      <Flex direction={"column"} gap={"sm"}>
        {links.map((link, index) => {
          const { hovered, ref } = useHover();
          return (
            <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
              <ActionIcon className="links-animated" ref={ref} component="a" href={link.url} target="_blank" display={"none"} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "white"} >
                <link.icon size={22} />
              </ActionIcon>
            </Group>
          );
        })}
      </Flex>
      <Flex direction={"column"} gap={"sm"}>
        {buttons.map((button, index) => {
          const { hovered, ref } = useHover();
          return (
            <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
              <ActionIcon className="links-animated" ref={ref} display={"none"} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "white"} >
                <button.icon size={22} /> {/* TODO - adicionar spotlight */}
              </ActionIcon>
            </Group>
          );
        })}
      </Flex>
    </Flex>
  );
}
