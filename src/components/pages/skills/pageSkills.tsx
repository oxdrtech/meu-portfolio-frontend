import { skillsMock } from "@/mocks/skills.mock";
import themeDevices from "@/styles/themeDevices";
import { Accordion, Badge, Card, Flex, Group, Highlight, HoverCard, Stack, Text } from "@mantine/core";
import { IconArrowDownLeft } from "@tabler/icons-react";
import { useState } from "react";

export default function PageSkills() {
  const { isMobile } = themeDevices();
  const [openedItem, setOpenedItem] = useState<string | null>(skillsMock[0]?.id || null);

  const skills = skillsMock.map((skill, index) => (
    <Accordion.Item
      value={skill.id}
      key={index}
      onMouseEnter={() => setOpenedItem(skill.id)}
      onMouseLeave={() => setOpenedItem(skillsMock[0]?.id)}
    >
      <Accordion.Control pos={"relative"}>
        <Stack gap={"xs"} pt={openedItem === skill.id ? (isMobile ? "" : "lg") : ""} style={{
          transition: "0.4s ease",
        }}>
          <Stack gap={"4"}>
            <Text fw={"bold"} fz={"lg"} c={"defaultColor"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              {skill.field}
            </Text>
            <Text fw={"bold"} inline style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              {skill.title}
            </Text>
          </Stack>
          <Stack gap={"xs"} px={"sm"}>
            <Text fz={"xs"} c={"dimmed"} inline>
              Ferramentas
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
                      + {skill.skills.length - 5} ferramentas
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
        <Stack pos={"absolute"} right={"10px"} top={"10px"}>
          <IconArrowDownLeft size={"28"} color="grey" style={{
            rotate: openedItem === skill.id ? "180deg" : "0deg",
            transition: "0.4s ease",
          }} />
        </Stack>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack px={"sm"} pb={openedItem === skill.id ? (isMobile ? "" : "lg") : ""} style={{
          transition: "0.4s ease",
        }}>
          <Text fz={"sm"} inline>
            {skill.description}
          </Text>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Flex className="panel" id="habilidades" h={"100vh"} justify={"center"} align={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"90vh"} w={"70rem"} maw={"90vw"} align={"center"}>
          <Stack>
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
              fz={isMobile ? "3vh" : "5vh"}
              inline
              style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>
              Com as ferramentas mais modernas e boas práticas de desenvolvimento, cada projeto ganha uma base sólida, preparada para uma evolução contínua
            </Highlight>
          </Stack>
          <Stack flex={"1"} justify={"center"} w={"60rem"} maw={"90vw"}>
            <Card p={"0"} radius={"md"} style={{
              backdropFilter: "blur(100px)",
              background: "#23232350",
            }}>
              <Accordion
                value={openedItem}
                variant={"contained"}
                transitionDuration={400}
                chevron={false}
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
