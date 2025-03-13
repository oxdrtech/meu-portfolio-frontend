import themeDevices from "@/styles/themeDevices";
import { Flex, Group, Highlight, Paper, Stack, Text } from "@mantine/core";
import CareerCarousel from "./carousel/careersCarousel";
import CareerCarouselFull from "./carousel/careersCarouselFull";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  triggerGSAP: boolean;
}

export default function PageCareers({ triggerGSAP }: Props) {
  const { isMobile, isDesktop } = themeDevices();
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const yearsOfExperience = currentYear - startYear;
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap.set(".containerCareers", {
        display: "flex",
        yPercent: -100,
        opacity: 0,
      });
      gsap.set(".objectCareers", {
        display: "flex",
        yPercent: 100,
        opacity: 0,
      });

      gsap.timeline()
        .to(".containerCareers", {
          delay: .1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        })
        .to(".objectCareers", {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });
    } else {
      gsap.to(".containerCareers", {
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
        <Flex className={"containerCareers"} display={"none"} m={"56 10 10 10"} pos={"relative"} flex={"1"} justify={"center"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Text pos={"absolute"} fz={isDesktop ? "80vh" : isMobile ? "20vh" : "40vh"} fw={"bolder"} c={"#4f542f"} left={0} top={-50} ml={"xl"} opacity={.3} inline style={{
            zIndex: -1,
          }}>CARREIRA</Text>
          <Stack h={"100%"} px={"lg"} align={"center"} justify={isDesktop ? "flex-end" : "center"} pb={isDesktop ? "30" : ""} gap={isMobile ? "lg" : "xl"}>
            <Group component={"span"} gap={"sm"} style={{
              overflow: "hidden",
            }}>
              <Stack className={"objectCareers"} display={"none"} w={isMobile ? "90vw" : "80vw"} gap={"0"}>
                <Highlight
                  highlight={[
                    "qualidade",
                    "performance",
                    "design",
                  ]}
                  highlightStyles={{
                    color: "#DAFF01",
                    WebkitBackgroundClip: 'text',
                  }}
                  fz={isMobile ? "h2" : "h1"}
                  fw={"lighter"}
                  inline
                  style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}
                >
                  {`Há ${yearsOfExperience} anos desenvolvendo aplicações web para empresas e negócios independentes, unindo qualidade, alta performance, design elegante`}
                </Highlight>
              </Stack>
            </Group>
            <Paper className={"objectCareers"} display={"none"} w={isMobile ? "90vw" : "80vw"} h={1} bg={"defaultColor"} />
            <Group component={"span"} gap={"sm"} style={{
              overflow: "hidden",
            }}>
              <Stack className={"objectCareers"} display={"none"} w={isMobile ? "90vw" : "80vw"} align={"center"}>
                {
                  isMobile
                    ? <CareerCarousel />
                    : <CareerCarouselFull />
                }
              </Stack>
            </Group>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
