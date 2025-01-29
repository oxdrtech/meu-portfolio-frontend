import themeDevices from "@/styles/themeDevices";
import { Flex, Paper, Stack, Text } from "@mantine/core";

export default function About() {
  const { isMobile } = themeDevices();

  return (
    <>
      <Flex className="panel" id="sobre-mim" h={"100vh"} justify={"center"} align={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"100vh"} justify="space-between">
          <Stack w={"60rem"} maw={"90vw"} gap={0} align="center">
            <Paper bg={"none"}>
              <Text component="h1" fw={"bold"} fz={isMobile ? "h2" : "h1"} px={"xs"} ta={"center"} style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                Criando com propósito
              </Text>
              <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"} />
            </Paper>
            <Text ta={"center"} py={"xs"} fz={isMobile ? "sm" : "md"} c={"defaultColor"} style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              Há 2 anos desenvolvendo sites e aplicações web sob medida para empresas e negócios independentes, transformo ideias em soluções reais que unem qualidade, alta performance, design elegante e uma experiência do usuário marcante
            </Text>
          </Stack>
          <Stack w={"60rem"} maw={"90vw"} gap={0} align="center">
            <Paper bg={"none"}>
              <Text component="h1" fw={"bold"} fz={isMobile ? "h2" : "h1"} px={"xs"} ta={"center"} style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                Carreira
              </Text>
              <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"} />
            </Paper>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
