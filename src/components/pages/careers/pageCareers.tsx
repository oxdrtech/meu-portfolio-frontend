import { careersMock } from "@/mocks/careers.mock";
import themeDevices from "@/styles/themeDevices";
import { formatDate } from "@/utils/formatDate";
import { Accordion, Avatar, Card, Flex, Group, Highlight, Stack, Text } from "@mantine/core";
import { IconArrowDownLeft, IconBriefcaseFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function PageCareers() {
  const { isMobile } = themeDevices();
  const [openedItem, setOpenedItem] = useState<string | null>(careersMock[0]?.id || null);

  const careers = careersMock.map((career, index) => (
    <Accordion.Item
      value={career.id}
      key={index}
      onMouseEnter={() => setOpenedItem(career.id)}
      onMouseLeave={() => setOpenedItem(careersMock[0]?.id)}
    >
      <Accordion.Control pos={"relative"}>
        <Stack gap={"xs"} pt={openedItem === career.id ? "lg" : ""} style={{
          transition: "0.4s ease",
        }}>
          <Flex gap={"md"} align={"center"}>
            <Avatar
              src={career.company_logo && career.company_logo}
              size={"50"} radius={"sm"}>
              {!career.company_logo && <IconBriefcaseFilled color="#DAFF01" />}
            </Avatar>
            <Stack gap={"4"}>
              <Text fw={"bold"} fz={"lg"} c={"defaultColor"} inline style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>{career.position}</Text>
              <Text fw={"bold"} inline style={{
                textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
              }}>{career.company}</Text>
              {
                career.start_date
                && (
                  <Stack gap={"4"}>
                    <Group gap={"6"}>
                      <Text fz={"xs"} c={"dimmed"} inline>{formatDate(career.start_date)}</Text>
                      <Text fz={"xs"} c={"dimmed"} inline>-</Text>
                      <Text fz={"xs"} c={"dimmed"} inline>{career.end_date ? formatDate(career.end_date) : "o momento"}</Text>
                    </Group>
                  </Stack>
                )
              }
            </Stack>
          </Flex>
        </Stack>
        <Stack pos={"absolute"} right={"10px"} top={"10px"}>
          <IconArrowDownLeft size={"28"} color="grey" style={{
            rotate: openedItem === career.id ? "180deg" : "0deg",
            transition: "0.4s ease",
          }} />
        </Stack>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack px={"sm"} pb={openedItem === career.id ? "lg" : ""} style={{
          transition: "0.4s ease",
        }}>
          <Text fz={isMobile ? "sm" : ""} lh={"xs"}>
            {career.description}
          </Text>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
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
          <Stack justify={"center"} w={"60rem"} maw={"90vw"}>
            {/* TODO - adicioar Tabs com as areas: carreira e formação */}
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
                {careers}
              </Accordion>
            </Card>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
