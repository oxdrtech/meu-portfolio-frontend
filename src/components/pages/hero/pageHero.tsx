import { socialButtonsMock } from "@/mocks/navigationButtons.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Avatar, BackgroundImage, Badge, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useHover } from "@mantine/hooks";

export default function PageHero() {
  const { isMobile } = themeDevices();

  // const gsapRef = useRef(null);
  // gsap.registerPlugin(ScrollTrigger);

  // useGSAP(() => {
  //   if (gsapRef.current) {
  //     gsap.set(".paper-animated", {
  //       scale: 10,
  //       opacity: 0,
  //     });
  //     gsap.set(".avatar-animated", {
  //       scale: 0,
  //     });
  //     gsap.set(".objectup-animated", {
  //       yPercent: 100,
  //       opacity: 0,
  //     });
  //     gsap.set(".line-animated", {
  //       scaleX: 0,
  //       opacity: 0,
  //     });

  //     gsap
  //       .timeline()
  //       .to(".paper-animated", {
  //         opacity: 1,
  //         scale: 1,
  //         duration: .6,
  //       })
  //       .to(".avatar-animated", {
  //         scale: 1,
  //         duration: .4,
  //       }, "-=0.2")
  //       .to(".objectup-animated", {
  //         opacity: 1,
  //         yPercent: 0,
  //         duration: .5,
  //       }, "-=0.2")
  //       .to(".line-animated", {
  //         scaleX: 1,
  //         opacity: 1,
  //         duration: .2,
  //         transformOrigin: "left center",
  //       }, "-=0.2")
  //   };
  // }, { scope: gsapRef })

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
              <Paper className="line-animated" w={"80vw"} h={2} bg={"#C9C9C9"} />
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
              <Paper className="line-animated" w={"80vw"} h={2} bg={"#C9C9C9"} />
              <Group w={"80vw"} >
                <Avatar className="avatar-animated" size={"60"} src={"https://avatars.githubusercontent.com/u/83263335?v=4"} />
                <Stack gap={"0"}>
                  <Text fz={"h4"} pl={"4"} style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>
                    André Campos
                  </Text>
                  <Group gap={"xs"}>
                    {socialButtons}
                  </Group>
                </Stack>
              </Group>
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
    </>
  );
}

{/* <Stack h={"80vh"} justify={"space-between"}>
  <Stack gap={0} flex={1} justify={"center"} mt={"50"}>
    <Paper className="paper-animated" bg={"defaultColor"} mx={"auto"} my={"lg"} radius={"50%"} p={2} shadow="xl">
      <Avatar className="avatar-animated" size={isMobile ? "20vh" : "30vh"} src={"https://avatars.githubusercontent.com/u/83263335?v=4"} />
    </Paper>
    <Group component={"span"} style={{ overflow: "hidden" }} justify={"center"}>
      <Text className="objectup-animated" opacity={"0"} component="h1" fw={"normal"} fz={isMobile ? "2vh" : "md"} style={{
        textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
      }}>
        🙋‍♂️ Olá, meu nome é
      </Text>
    </Group>
    <Group component={"span"} style={{ overflow: "hidden" }} justify={"center"}>
      <Text className="objectup-animated" opacity={"0"} component={"h1"} fw={"bold"} fz={isMobile ? "5vh" : "42"} inline style={{
        textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
      }}>
        André Campos
      </Text>
    </Group>
    <Group gap={"xs"}>
      <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"} />
      <Group component={"span"} style={{ overflow: "hidden" }}>
        <Text className="objectup-animated" opacity={"0"} component="h1" fw={"normal"} fz={isMobile ? "2vh" : "md"} inline style={{
          textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
        }}>
          FULLSTACK | React & Node
        </Text>
      </Group>
    </Group>
  </Stack>
</Stack> */}