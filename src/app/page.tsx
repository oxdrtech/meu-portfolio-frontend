'use client'
import { Button, Flex, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const animateElement = (selector: string, trigger: string, config: object) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger,
              scrub: true,
              ...config,
            },
          }
        );
      };

      const defaultScrollConfig = {
        start: "top 770px",
        end: "bottom 900px",
      };

      animateElement(".title", ".box-02", defaultScrollConfig);
      animateElement(".text", ".box-02", { ...defaultScrollConfig, start: "top 750px" });
      animateElement(".button", ".box-02", { ...defaultScrollConfig, start: "top 730px" });
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <Flex pos={"relative"} className="box-01" bg={"blue"} w={"80vw"} direction={"column"} ta={"center"} h={"200vh"} m={"auto"}>
        <Text pos={"sticky"} top={0}>teste</Text>
      </Flex>

      <Flex className="box-02" bg={"green"} w={"80vw"} direction={"column"} ta={"center"} h={"30vh"} m={"auto"} justify={"center"} align={"center"}>
        <Title className="title">Plano de Desenvolvimento Profissional (PDP)</Title>
        <Text className="text" w={"60vw"} p={"lg"}>
          Cada missão é um passo importante para o seu{" "}
          <Text component="span" c={"blue"}>
            desenvolvimento profissional.
          </Text>{" "}
          Siga as orientações, cumpra as tarefas e esteja preparado para alcançar seus objetivos. Estamos com você nessa jornada.
        </Text>
        <Button className="button">botao</Button>
      </Flex>

      <Flex className="box-03" bg={"teal"} w={"80vw"} direction={"column"} ta={"center"} h={"100vh"} m={"auto"} justify={"center"} align={"center"}></Flex>

      <Flex className="box-04" bg={"red"} w={"80vw"} direction={"column"} ta={"center"} h={"100vh"} m={"auto"} justify={"center"} align={"center"}></Flex>
    </>
  );
}
