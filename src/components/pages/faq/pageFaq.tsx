import themeDevices from "@/styles/themeDevices";
import { Flex, Group, Stack, Text } from "@mantine/core";
import FaqAccordion from "./accordion/faqAccordion";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  triggerGSAP: boolean;
}

export default function PageFaq({ triggerGSAP }: Props) {
  const { isMobile, isDesktop } = themeDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap.set(".containerFaq", {
        display: "flex",
        yPercent: -100,
        opacity: 0,
      });
      gsap.set(".objectFaq", {
        display: "flex",
        yPercent: 100,
        opacity: 0,
      });

      gsap.timeline()
        .to(".containerFaq", {
          delay: .1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        })
        .to(".objectFaq", {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });
    } else {
      gsap.to(".containerFaq", {
        opacity: 0,
        duration: 0.25,
        display: "none",
      });
    }
  }, [triggerGSAP]);

  return (
    <>
      <Flex ref={gsapRef} w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex className={"containerFaq"} display={"none"} m={"56 10 10 10"} flex={"1"} justify={"center"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Text pos={"absolute"} fz={isDesktop ? "70vh" : isMobile ? "20vh" : "40vh"} fw={"bolder"} c={"#4f542f"} left={0} top={-50} ml={"xl"} opacity={.3} inline style={{
            zIndex: -1,
          }}>PERGUNTAS</Text>
          <Stack w={isDesktop ? "60vw" : "90vw"} h={"100%"} align={"center"} justify={isDesktop ? "flex-end" : "center"} pb={isDesktop ? "80" : ""} gap={isMobile ? "lg" : "xl"}>
            <Group component={"span"} gap={"sm"} style={{
              overflow: "hidden",
            }}>
              <Group className={"objectFaq"} display={"none"}>
                <FaqAccordion />
              </Group>
            </Group>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
