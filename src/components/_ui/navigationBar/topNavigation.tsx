import { pagesMock } from "@/mocks/pages.mock";
import { useGSAP } from "@gsap/react";
import { Flex, Group, Text } from "@mantine/core";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

export default function TopNavigation() {
  const gsapRef = useRef(null);
  const [activePage, setActivePage] = useState("");

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.set(".pages-animated", { display: "flex", yPercent: 100, opacity: 0 });

      gsap.timeline().to(".pages-animated", { delay: 1, opacity: 1, yPercent: 0, duration: 0.5 });
    }
  }, []);

  // Detecta a seção visível pelo scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section"); // Seções das páginas

    const handleScroll = () => {
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          currentSection = section.id;
        }
      });

      if (currentSection) {
        setActivePage(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Executa no carregamento

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = pagesMock.map((page, index) => (
    <Group key={index} component="span" style={{ overflow: "hidden" }}>
      {index > 0 && <Text className="pages-animated" style={{ margin: "0 8px" }}>|</Text>}
      <Text
        className="pages-animated"
        component="a"
        href={`#${page.target}`}
        style={{
          color: activePage === page.target ? "red" : "white",
          fontWeight: activePage === page.target ? "bold" : "normal",
          transition: "color 0.3s ease",
        }}
      >
        {page.label}
      </Text>
    </Group>
  ));

  return (
    <Flex
      ref={gsapRef}
      w="max-content"
      m="lg"
      gap="10"
      style={{
        zIndex: 300,
      }}
    >
      {pages}
    </Flex>
  );
}
