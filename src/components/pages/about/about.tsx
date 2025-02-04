import { carreira } from "@/mocks/carreira";
import themeDevices from "@/styles/themeDevices";
import { Avatar, Badge, Card, Flex, Group, HoverCard, Stack, Table, Text } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";

export default function About() {
  const { isMobile } = themeDevices();

  const rows = carreira.map((trabalho, index) => (
    <Table.Tr key={index}>
      <Table.Td pl={"lg"}>
        <Avatar src={trabalho.empresa_logo && trabalho.empresa_logo} size={"50"} radius={"sm"} >{!trabalho.empresa_logo && <IconBriefcaseFilled color="#DAFF01" />}</Avatar>
      </Table.Td>
      <Table.Td py={"md"} pr={"lg"}>
        <Stack gap={"xs"}>
          <Stack gap={"4"}>
            <Text fw={"bold"} fz={"lg"} c={"defaultColor"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>{trabalho.cargo}</Text>
            {
              trabalho.inicio
              && (
                <Stack gap={"4"}>
                  <Text fw={"bold"} inline style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>{trabalho.empresa}</Text>
                  <Group gap={"6"}>
                    <Text fz={"xs"} c={"dimmed"} inline>{trabalho.inicio}</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>-</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>{trabalho.termino ? trabalho.termino : "o momento"}</Text>
                  </Group>
                </Stack>
              )
            }
          </Stack>
          <Text fz={isMobile ? "sm" : ""} inline>{trabalho.descricao}</Text>
          <Group gap={isMobile ? "6" : "xs"}>
            {trabalho.competencias.slice(0, 5).map((comp, index) => (
              <Badge variant="outline" key={index}>{comp}</Badge>
            ))}
            {trabalho.competencias.length > 5 && (
              <HoverCard width={200} position="bottom" withArrow shadow="md">
                <HoverCard.Target>
                  <Badge variant="light" style={{ cursor: "pointer" }}>
                    + {trabalho.competencias.length - 5} competências
                  </Badge>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Stack gap="xs">
                    {trabalho.competencias.slice(5).map((comp, index) => (
                      <Text key={index} fz={"sm"} c={"defaultColor"} inline>{comp}</Text>
                    ))}
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            )}
          </Group>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex className="panel" id="sobre-mim" h={"100vh"} justify={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"90vh"} w={"70rem"} maw={"90vw"} justify="space-around" align={"center"} gap={"xl"}>
          <Text ta={"center"} fw={"bold"} fz={isMobile ? "h4" : "h1"} mt={isMobile ? "40" : "80"} inline style={{
            textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
          }}>
            Há 2 anos desenvolvendo sites e aplicações web sob medida para empresas e negócios independentes, transformando ideias em soluções reais que unem qualidade, alta performance, design elegante e uma experiência do usuário marcante
          </Text>
          <Stack justify={"center"}>
            <Card p={"0"} radius={"md"} style={{
              backdropFilter: "blur(100px)",
              background: "#23232350"
            }}>
              <Table highlightOnHover>
                <Table.Tbody>
                  {rows}
                </Table.Tbody>
              </Table>
            </Card>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
