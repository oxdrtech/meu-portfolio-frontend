import { skillsMock } from "@/mocks/skills.mock";
import themeDevices from "@/styles/themeDevices";
import { Accordion, Badge, Card, Flex, Group, Highlight, HoverCard, Stack, Text } from "@mantine/core";
import { IconArrowDownLeft } from "@tabler/icons-react";
import { useState } from "react";

export default function Skills() {
  const { isMobile } = themeDevices();
  const [openedItem, setOpenedItem] = useState<string | null>(skillsMock[0]?.field || null);

  const skills = skillsMock.map((skill, index) => (
    <Accordion.Item
      value={skill.field}
      key={index}
      onMouseEnter={() => setOpenedItem(skill.field)}
      onMouseLeave={() => setOpenedItem(skillsMock[0]?.field)}
    >
      <Accordion.Control>
        <Group gap={"xs"}>
          <Text
            fw={"bold"}
            fz={"lg"}
            c={"defaultColor"}
            inline
            style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
            {skill.title}
          </Text>
          <Text fw={"bold"} c={"dimmed"} inline>
            {skill.field}
          </Text>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack
          px={"xs"}
          style={{
            overflow: "hidden",
            transition: "0.5s ease",
          }}
        >
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
      </Accordion.Panel>
    </Accordion.Item>
  ));

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
              <Accordion
                value={openedItem}
                variant={"contained"}
                transitionDuration={400}
                chevron={<IconArrowDownLeft color="gray" size={"28"} />}
                chevronSize={"28px"}
              >
                {skills}
              </Accordion>
            </Card>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
