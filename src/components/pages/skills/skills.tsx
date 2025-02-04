import { skillsMock } from "@/mocks/skills.mock";
import themeDevices from "@/styles/themeDevices";
import { Badge, Card, Flex, Group, Highlight, HoverCard, Stack, Table, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconArrowDownLeft } from "@tabler/icons-react";
import { useState } from "react";

export default function Skills() {
  const { isMobile } = themeDevices();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rows = skillsMock.map((skill, index) => {
    const { ref, hovered } = useHover();

    const responsiveMinHeight = isMobile ? "150px" : "100px";
    const responsiveMaxHeight = isMobile ? "350px" : "200px";

    const height = index === 0 ? (activeIndex === 1 ? responsiveMinHeight : responsiveMaxHeight) : hovered ? responsiveMaxHeight : responsiveMinHeight;
    const padding = index === 0 ? (activeIndex === 1 ? "xs" : "lg") : hovered ? "lg" : "xs";
    const rotate = index === 0 ? (activeIndex === 1 ? "0deg" : "180deg") : hovered ? "180deg" : "0deg";

    return (
      <Table.Tr
        key={index}
        ref={ref}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <Table.Td>
          <Stack
            px={"xs"}
            py={padding}
            style={{
              height,
              overflow: "hidden",
              transition: "0.5s ease",
            }}
          >
            <Group gap={"xs"}>
              <Text
                fw={"bold"}
                fz={"lg"}
                c={"defaultColor"}
                inline
                style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}
              >
                {skill.title}
              </Text>
              <Text fw={"bold"} c={"dimmed"} inline>
                {skill.field}
              </Text>
            </Group>
            <Stack pl={"xl"}>
              <Text inline>{skill.description}</Text>
              <Text c={"dimmed"} inline>
                Habilidades
              </Text>
              <Group gap={isMobile ? "6" : "xs"}>
                {skill.skills.slice(0, 5).map((skill, index) => (
                  <Badge variant="outline" key={index}>
                    {skill}
                  </Badge>
                ))}
                {skill.skills.length > 5 && (
                  <HoverCard width={200} position="bottom" withArrow shadow="md">
                    <HoverCard.Target>
                      <Badge variant="light" style={{ cursor: "pointer" }}>
                        + {skill.skills.length - 5} competências
                      </Badge>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Stack gap="xs">
                        {skill.skills.slice(5).map((skill, index) => (
                          <Text key={index} fz={"sm"} c={"defaultColor"} inline>
                            {skill}
                          </Text>
                        ))}
                      </Stack>
                    </HoverCard.Dropdown>
                  </HoverCard>
                )}
              </Group>
            </Stack>
          </Stack>
        </Table.Td>
        <Table.Td pos={"relative"}>
          <IconArrowDownLeft
            size={"22"}
            style={{
              rotate,
              position: "absolute",
              top: "10px",
              right: "10px",
              transitionDuration: ".5s",
            }}
          />
        </Table.Td>
      </Table.Tr>
    );
  });


  return (
    <>
      <Flex className="panel" id="habilidades" h={"100vh"} justify={"center"} align={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"90vh"} w={"70rem"} maw={"90vw"} justify="space-around" align={"center"} gap={"xl"}>
          <Highlight
            highlight={[
              "modernas",
              "sólida",
              "evolução",
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
            Com as tecnologias mais modernas e boas práticas de desenvolvimento, cada projeto ganha uma base sólida, preparada para uma evolução contínua
          </Highlight>
          <Stack justify={"center"} w={"60rem"} maw={"90vw"}>
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
