import { useState, useEffect } from "react";
import { socialButtonsMock } from "@/mocks/navigationButtons.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Avatar, BackgroundImage, Badge, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconMouse } from "@tabler/icons-react";

const works = ["interfaces", "API's REST", "databases", "automações"];
const randomChars = "!@#$%&*?";

export default function PageHero() {
  const { isMobile, isDesktop } = themeDevices();
  const [displayText, setDisplayText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const word = works[loopIndex % works.length];
    let progress = 0;

    const interval = setInterval(() => {
      if (progress <= word.length) {
        let scrambledText = word
          .split("")
          .map((char, i) =>
            i < progress
              ? char
              : randomChars[Math.floor(Math.random() * randomChars.length)]
          )
          .join("");

        setDisplayText(scrambledText);
        progress++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoopIndex((prev) => (prev + 1) % works.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loopIndex]);

  const socialButtons = socialButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        <ActionIcon ref={ref} component="a" href={btn.url} target="_blank" variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"}>
          <btn.icon size={22} />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <>
      <Flex className="panel" id="inicio" w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} flex={"1"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <BackgroundImage src={"./backgroundHero.gif"}>
            <Stack h={"100%"} p={"lg"} align={"center"} justify={"flex-end"} gap={"xl"} style={{
              backdropFilter: isMobile ? "blur(6px)" : "blur(6px)",
              backgroundImage: 'url(./noise.png)',
              backgroundColor: "#11111160",
            }}>
              <Stack w={"80vw"} gap={"0"}>
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
              <Paper w={"80vw"} h={1} bg={"#C9C9C9"} />
              <Stack w={"80vw"} gap={"0"} ta={"end"}>
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
              <Paper w={"80vw"} h={1} bg={"#C9C9C9"} />
              <Group w={"80vw"} gap={"sm"}>
                <Avatar src={"https://avatars.githubusercontent.com/u/83263335?v=4"} size={"50"} />
                <Group flex={"1"} justify="space-between">
                  <Text fz={isDesktop ? "h3" : "h4"} pl={"4"} fw={"bold"} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    André Campos
                  </Text>
                  <Group gap={"xs"}>
                    {socialButtons}
                  </Group>
                </Group>
              </Group>
              <IconMouse />
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
    </>
  );
}
