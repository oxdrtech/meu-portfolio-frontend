import { socialButtonsMock } from "@/mocks/navigationButtons.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Avatar, BackgroundImage, Badge, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useHover } from "@mantine/hooks";

export default function PageHero() {
  const { isMobile } = themeDevices();

  const socialButtons = socialButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        <ActionIcon ref={ref} component="a" href={btn.url} target="_blank" variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"} >
          <btn.icon size={22} />
        </ActionIcon>
      </Group>
    );
  })

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
            <Stack h={"100%"} p={"lg"} align={"center"} justify={"flex-end"} pb={"74"} gap={"xl"} style={{
              backdropFilter: isMobile ? "blur(6px)" : "blur(6px)",
              backgroundImage: 'url(./noise.png)',
              backgroundColor: "#11111160",
            }}>
              <Stack w={"80vw"} gap={"0"}>
                <Group mb={"lg"} gap={"xs"}>
                  <Badge variant={"outline"} color={"#C9c9c9"} size={"lg"} >Sistemas</Badge>
                  <Badge variant={"outline"} color={"#C9c9c9"} size={"lg"} >Soluções</Badge>
                </Group>
                <Title order={1} fz={isMobile ? "h2" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  Desenvolvedor Web FullStack
                </Title>
                <Title order={1} fz={isMobile ? "h2" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  Criação de interfaces
                </Title>
              </Stack>
              <Paper w={"80vw"} h={2} bg={"#C9C9C9"} />
              <Stack w={"80vw"} gap={"0"} ta={"end"}>
                <Title order={2} fz={isMobile ? "h3" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  Criando soluções
                </Title>
                <Title order={2} fz={isMobile ? "h3" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  simples para problemas
                </Title>
                <Title order={2} fz={isMobile ? "h3" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  complexos
                </Title>
              </Stack>
              <Paper w={"80vw"} h={2} bg={"#C9C9C9"} />
              <Group w={"80vw"} >
                <Avatar src={"https://avatars.githubusercontent.com/u/83263335?v=4"} size={"50"} />
                <Group flex={"1"} justify="space-between">
                  <Text fz={"h4"} pl={"4"} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    André Campos
                  </Text>
                  <Group gap={"xs"}>
                    {socialButtons}
                  </Group>
                </Group>
              </Group>
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
    </>
  );
}
