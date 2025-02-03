import themeDevices from "@/styles/themeDevices";
import { carreira } from "@/utils/carreira";
import { Avatar, Badge, Flex, Group, Paper, Popover, Stack, Table, Text } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";

export default function About() {
  const { isMobile } = themeDevices();

  const rows = carreira.map((trabalho, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Avatar src={trabalho.empresa_logo && trabalho.empresa_logo} size={"50"} radius={"sm"} >{!trabalho.empresa_logo && <IconBriefcaseFilled color="#DAFF01" />}</Avatar>
      </Table.Td>
      <Table.Td py={"md"}>
        <Stack gap={"xs"}>
          <Stack gap={"4"}>
            <Text fw={"bold"} fz={"lg"} c={"defaultColor"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>{trabalho.cargo}</Text>
            {
              trabalho.inicio
              && (
                <Stack gap={"4"}>
                  <Text fw={"bold"} fz={"lg"} inline style={{
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
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Badge variant="light" style={{ cursor: "pointer" }}>
                    + {trabalho.competencias.length - 5} competências
                  </Badge>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack gap="xs">
                    {trabalho.competencias.slice(5).map((comp, index) => (
                      <Text key={index} fz={"sm"} c={"defaultColor"} inline>{comp}</Text>
                    ))}
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            )}
          </Group>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Flex className="panel" id="sobre-mim" h={"100vh"} justify={"center"} align={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"100vh"} justify="space-between" align={"center"}>
          <Stack w={"70rem"} maw={"90vw"} gap={0} align="center">
            <Paper bg={"none"}>
              <Text component="h1" fw={"bold"} fz={isMobile ? "h2" : "h1"} px={"xs"} ta={"center"} style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                Criando com propósito
              </Text>
              <Paper flex={1} h={2} bg={"defaultColor"} />
            </Paper>
            <Text ta={"center"} py={"xs"} fw={"lighter"} fz={isMobile ? "md" : "lg"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              Há 2 anos desenvolvendo sites e aplicações web sob medida para empresas e negócios independentes, transformando ideias em soluções reais que unem qualidade, alta performance, design elegante e uma experiência do usuário marcante
            </Text>
          </Stack>
          <Stack flex={1} w={"60rem"} maw={"90vw"} gap={0} align={"center"} justify={"center"}>
            <Paper bg={"none"}>
              <Text component="h1" fw={"bold"} fz={isMobile ? "h2" : "h1"} px={"xs"} ta={"center"} style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
                Carreira
              </Text>
              <Paper flex={1} h={2} bg={"defaultColor"} />
            </Paper>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
