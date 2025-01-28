import themeDevices from "@/styles/themeDevices";
import { useGSAP } from "@gsap/react";
import { Flex, Group, Text } from "@mantine/core";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";

const pages = [
  { target: "inicio", label: "Início" },
  { target: "sobre-mim", label: "Sobre mim" },
  { target: "habilidades", label: "Habilidades" },
  { target: "projetos", label: "Projetos" },
  { target: "contato", label: "Contato" },
];

interface Props {
  triggerGSAP: boolean;
}

export default function RightNavigation({ triggerGSAP }: Props) {
  const { isMobile } = themeDevices();
  const gsapRef = useRef(null);

  gsap.registerPlugin(ScrollToPlugin);
  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      gsap.to(window, {
        scrollTo: element,
        duration: .1,
        ease: "power2.inOut",
      });
    }
  };

  useGSAP(() => {
    if (triggerGSAP) {
      const panels = gsap.utils.toArray(".panel") as HTMLElement[];

      gsap
        .set(".pages-animated", {
          display: "flex",
          yPercent: 100,
          opacity: 0,
        });

      gsap
        .timeline()
        .to(".pages-animated", {
          delay: 1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });

      panels.forEach((panel, index) => {
        gsap
          .to(`.target-${index + 1}`, {
            color: "#DAFF01",
            fontSize: 40,
            duration: 0.2,
            scrollTrigger: {
              trigger: panel,
              start: index === 0 ? "top top+=1" : "top 50%",
              end: index === panels.length - 1 ? "bottom bottom-=1" : "bottom 50%",
              toggleActions: "play reverse play reverse",
            },
          });
      });
    }
  }, [triggerGSAP]);

  return (
    <Flex ref={gsapRef} pos={"fixed"} w={"max-content"} direction={"column"} right={"1rem"} pt={isMobile ? "3rem" : "5rem"} pr={".3rem"} gap={"8"} align={"end"} style={{
      zIndex: 300,
    }}>
      {pages.map((page, index) => (
        <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
          <Text className={`target-${index + 1} pages-animated`} component="span" onClick={() => scrollToSection(page.target)} display={"none"} inline style={{
            cursor: "pointer",
            textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
          }}>
            {page.label}
          </Text>
        </Group>
      ))}
    </Flex>
  );
}
