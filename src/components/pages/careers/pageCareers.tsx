import { careersMock } from "@/mocks/careers.mock";
import themeDevices from "@/styles/themeDevices";
import { formatDate } from "@/utils/formatDate";
import { Accordion, Avatar, Flex, Group, Highlight, Paper, Stack, Text } from "@mantine/core";
import { IconArrowDownLeft, IconBriefcaseFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function PageCareers() {
  const { isMobile, isDesktop } = themeDevices();
  const [openedItem, setOpenedItem] = useState<string | null>(careersMock[0]?.id || null);

  const careers = careersMock.map((career, index) => (
    <Accordion.Item
      value={career.id}
      key={index}
      onMouseEnter={() => setOpenedItem(career.id)}
      onMouseLeave={() => setOpenedItem(careersMock[0]?.id)}
    >
      <Accordion.Control pos={"relative"}>
        <Flex gap={"md"} align={"center"}>
          <Avatar
            src={career.CAREER_COMPANY_LOGO && career.CAREER_COMPANY_LOGO}
            size={"50"}
            radius={"sm"}
          >
            {
              !career.CAREER_COMPANY_LOGO
              && (
                <IconBriefcaseFilled color="#DAFF01" />
              )
            }
          </Avatar>
          <Stack gap={"4"}>
            <Text fw={"bold"} c={"defaultColor"} inline>
              {career.CAREER_NAME}
            </Text>
            <Text fw={"bold"} inline>
              {career.CAREER_COMPANY}
            </Text>
            {
              career.CAREER_START_DATE
              && (
                <Stack gap={"4"}>
                  <Group gap={"6"}>
                    <Text fz={"xs"} c={"dimmed"} inline>{formatDate(career.CAREER_START_DATE)}</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>-</Text>
                    <Text fz={"xs"} c={"dimmed"} inline>{career.CAREER_END_DATE ? formatDate(career.CAREER_END_DATE) : "o momento"}</Text>
                  </Group>
                </Stack>
              )
            }
          </Stack>
        </Flex>
        <Stack pos={"absolute"} right={"10px"} top={"10px"}>
          <IconArrowDownLeft size={"28"} color="grey" style={{
            rotate: openedItem === career.id ? "180deg" : "0deg",
            transition: "0.4s ease",
          }} />
        </Stack>
      </Accordion.Control>
      <Accordion.Panel>
        <Text fz={"sm"} px={isMobile ? "" : "sm"} inline>
          {career.CAREER_DESCRIPTION}
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Flex className="panel" id="sobre-mim" w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} flex={"1"} justify={"center"} bg={"dark"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Stack h={"100%"} p={"lg"} align={"center"} justify={"center"} gap={"xl"}>
            <Stack w={isMobile ? "90vw" : "80vw"} gap={"0"}>
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
                fz={isMobile ? "h3" : !isDesktop ? "h2" : "h1"}
                fw={"lighter"}
                inline
              >
                Há 2 anos desenvolvendo aplicações web para empresas e negócios independentes, unindo qualidade, alta performance, design elegante e uma experiência do usuário marcante
              </Highlight>
            </Stack>
            <Paper w={isMobile ? "90vw" : "80vw"} h={1} bg={"defaultColor"} />
            <Stack w={isMobile ? "90vw" : "80vw"}>
              <Accordion
                value={openedItem}
                variant={"contained"}
                transitionDuration={400}
                chevron={false}
              >
                {careers}
              </Accordion>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
