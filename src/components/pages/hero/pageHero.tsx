import themeDevices from "@/styles/themeDevices";
import { Avatar, BackgroundImage, Badge, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconMouse } from "@tabler/icons-react";
import SocialButtons from "@/components/_ui/socialButtons/socialButtons";
import { useScrambledText } from "@/utils/useScrambledText";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const works = ["interfaces", "API's REST", "databases", "automações"];

interface Props {
  triggerGSAP: boolean;
}

export default function PageHero({ triggerGSAP }: Props) {
  const { isMobile, isDesktop } = themeDevices();
  const displayText = useScrambledText(works);
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap.set(".containerHero", {
        display: "flex",
        yPercent: -100,
        opacity: 0,
      });
      gsap.set(".objectHero", {
        display: "flex",
        yPercent: 100,
        opacity: 0,
      });

      gsap.timeline()
        .to(".containerHero", {
          delay: .1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        })
        .to(".objectHero", {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });
    } else {
      gsap.to(".containerHero", {
        opacity: 0,
        duration: 0.25,
        display: "none",
      });
    }
  }, [triggerGSAP]);

  return (
    <>
      <Flex ref={gsapRef} id="inicio" w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex className={"containerHero"} display={"none"} h={"100%"} m={"56 10 10 10"} flex={"1"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <BackgroundImage src={"./backgroundHero.gif"}>
            <Stack h={"100%"} p={"lg"} align={"center"} justify={"flex-end"} gap={isMobile ? "lg" : "xl"} style={{
              backdropFilter: isMobile ? "blur(6px)" : "blur(6px)",
              backgroundImage: 'url(./noise.png)',
              backgroundColor: "#11111130",
            }}>
              <Group component={"span"} gap={"sm"} style={{
                overflow: "hidden",
              }}>
                <Stack className="objectHero" display={"none"} w={"80vw"} gap={"0"}>
                  <Group mb={"lg"} gap={"xs"}>
                    <Badge variant={"outline"} color={"#C9c9c9"}>Sistemas</Badge>
                    <Badge variant={"outline"} color={"#C9c9c9"}>Soluções</Badge>
                  </Group>
                  <Flex direction={isDesktop ? "row" : "column"} gap={isDesktop ? "xl" : ""}>
                    <Title order={1} fz={isMobile ? "h2" : ""} style={{
                      textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                    }}>
                      Desenvolvedor
                    </Title>
                    <Title order={1} fz={isMobile ? "h2" : ""} style={{
                      textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                    }}>
                      Web FullStack
                    </Title>
                  </Flex>
                  <Flex direction={isDesktop ? "row" : "column"} gap={isDesktop ? "xl" : ""}>
                    <Title order={1} fz={isMobile ? "h2" : ""} style={{
                      textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                    }}>
                      Criação de
                    </Title>
                    <Title order={1} fz={isMobile ? "h2" : ""} c={"defaultColor"} style={{
                      textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                    }}>
                      {displayText}
                    </Title>
                  </Flex>
                </Stack>
              </Group>
              <Paper className="objectHero" display={"none"} w={"80vw"} h={1} bg={"#C9C9C9"} />
              <Group component={"span"} gap={"sm"} style={{
                overflow: "hidden",
              }}>
                <Stack className="objectHero" display={"none"} w={"80vw"} gap={"0"} ta={"end"}>
                  <Title order={2} fz={isMobile ? "h3" : ""} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    Criando soluções simples
                  </Title>
                  <Title order={2} fz={isMobile ? "h3" : ""} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    para problemas
                  </Title>
                  <Title order={2} fz={isMobile ? "h3" : ""} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    complexos
                  </Title>
                </Stack>
              </Group>
              <Paper className="objectHero" display={"none"} w={"80vw"} h={1} bg={"#C9C9C9"} />
              <Group component={"span"} gap={"sm"} style={{
                overflow: "hidden",
              }}>
                <Flex className="objectHero" display={"none"} direction={isMobile ? "column" : "row"} ta={isMobile ? "center" : "start"} w={"80vw"} align={isMobile ? "center" : ""} gap={isMobile ? "xs" : "sm"}>
                  <Avatar src={"https://avatars.githubusercontent.com/u/83263335?v=4"} size={"50"} m={"auto"} />
                  <Stack flex={isMobile ? "" : "1"} justify={isMobile ? "" : "space-between"} gap={"0"}>
                    <Text fz={isMobile ? "h5" : "h3"} pl={"4"} fw={"lighter"} style={{
                      textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                    }}>
                      André Campos
                    </Text>
                    <SocialButtons />
                  </Stack>
                </Flex>
              </Group>
              <IconMouse className="objectHero" display={"none"} size={20} />
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
    </>
  );
}
