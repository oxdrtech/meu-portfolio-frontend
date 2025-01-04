import { useGSAP } from "@gsap/react";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const links = [
  { icon: IconBrandLinkedin, url: 'https://www.linkedin.com/in/ddr23/' },
  { icon: IconBrandGithub, url: 'https://github.com/DDR23' }
];

interface Props {
  triggerGSAP: boolean;
}

export default function LeftNavigation({ triggerGSAP }: Props) {
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
    <Flex ref={gsapRef} pos={"fixed"} w={"max-content"} direction={"column"} left={"1rem"} pt={"5rem"} gap={"sm"} style={{ zIndex: 1000 }}>
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
  );
}
