import { careerMock } from "@/mocks/career.mock";
import themeDevices from "@/styles/themeDevices";
import { Avatar, Badge, Card, Flex, Group, Highlight, HoverCard, Stack, Table, Text } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";

export default function About() {
  const { isMobile } = themeDevices();

  const rows = careerMock.map((job, index) => (
    <Table.Tr key={index}>
      <Table.Td pl={"lg"}>
        <Avatar
          src={job.company_logo && job.company_logo}
          size={"50"} radius={"sm"}>
          {!job.company_logo && <IconBriefcaseFilled color="#DAFF01" />}
        </Avatar>
      </Table.Td>
      <Table.Td py={"md"} pr={"lg"}>
        <Stack gap={"xs"}>
          <Stack gap={"4"}>
            <Text fw={"bold"} fz={"lg"} c={"defaultColor"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>{job.position}</Text>
            {
              job.start_date
              && (
                <Stack gap={"4"}>
                  <Text fw={"bold"} inline style={{
                    textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                  }}>{job.company}</Text>
                  <Group gap={"6"}>
                    <Text fz={"xs"} c={"dimmed"} inline>{job.start_date}</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>-</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>{job.end_date ? job.end_date : "o momento"}</Text>
                  </Group>
                </Stack>
              )
            }
          </Stack>
          <Text fz={isMobile ? "sm" : ""} inline>{job.description}</Text>
          <Group gap={isMobile ? "6" : "xs"}>
            {job.skills.slice(0, 5).map((skill, index) => (
              <Badge variant="outline" key={index}>{skill}</Badge>
            ))}
            {job.skills.length > 5 && (
              <HoverCard width={200} position="bottom" withArrow shadow="md">
                <HoverCard.Target>
                  <Badge variant="light" style={{ cursor: "pointer" }}>
                    + {job.skills.length - 5} competências
                  </Badge>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Stack gap="xs">
                    {job.skills.slice(5).map((skill, index) => (
                      <Text key={index} fz={"sm"} c={"defaultColor"} inline>{skill}</Text>
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
          <Highlight
            highlight={[
              "qualidade",
              "performance",
              "design",
              "experiência",
            ]}
            highlightStyles={{
              color: "#DAFF01",
              WebkitBackgroundClip: 'text',
            }}
            ta={"center"}
            fw={"bold"}
            fz={isMobile ? "h4" : "h1"}
            mt={isMobile ? "40" : "80"}
            inline
            style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
            Há 2 anos desenvolvendo sites e aplicações web sob medida para empresas e negócios independentes, transformando ideias em soluções reais que unem qualidade, alta performance, design elegante e uma experiência do usuário marcante
          </Highlight>
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
