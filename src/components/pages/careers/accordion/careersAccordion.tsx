import { careersMock } from "@/mocks/careers.mock";
import { formatDate } from "@/utils/formatDate";
import { Accordion, Avatar, Badge, Flex, Group, HoverCard, Stack, Text } from "@mantine/core";
import { IconArrowDownLeft, IconBriefcaseFilled } from "@tabler/icons-react";
import { useState } from "react";

export default function CareersAccordion() {
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
            src={career.company_logo && career.company_logo}
            size={"50"}
            radius={"sm"}
          >
            {
              !career.company_logo
              && (
                <IconBriefcaseFilled color="#DAFF01" />
              )
            }
          </Avatar>
          <Stack gap={"4"}>
            <Text fw={"bold"} c={"defaultColor"} inline>
              {career.name}
            </Text>
            <Text fw={"bold"} inline>
              {career.company}
            </Text>
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
        <Stack pos={"absolute"} right={"10px"} top={"10px"}>
          <IconArrowDownLeft size={"28"} color="grey" style={{
            rotate: openedItem === career.id ? "180deg" : "0deg",
            transition: "0.4s ease",
          }} />
        </Stack>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack px={"sm"} gap={"xs"}>
          <Text fz={"sm"}>
            {career.description}
          </Text>
          <Group gap={"xs"}>
            {career.competencias.slice(0, 5).map((comp, index) => (
              <Badge variant="outline" key={index}>{comp}</Badge>
            ))}
            {career.competencias.length > 5 && (
              <HoverCard width={200} position="bottom" withArrow shadow="md">
                <HoverCard.Target>
                  <Badge variant="light" style={{ cursor: "pointer" }}>
                    + {career.competencias.length - 5} competências
                  </Badge>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Stack gap="xs">
                    {career.competencias.slice(5).map((comp, index) => (
                      <Text key={index} fz={"sm"} c={"defaultColor"} inline>{comp}</Text>
                    ))}
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            )}
          </Group>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Accordion
        value={openedItem}
        variant={"contained"}
        transitionDuration={400}
        chevron={false}
      >
        {careers}
      </Accordion>
    </>
  );
}
