import { careersMock } from '@/mocks/careers.mock';
import { formatDate } from '@/utils/formatDate';
import { Carousel } from '@mantine/carousel';
import { Avatar, Badge, Flex, Group, HoverCard, Stack, Text } from '@mantine/core';
import { IconBriefcaseFilled } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import classes from "./careersCarousel.module.css"

export default function CareerCarouselFull() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [isMouseInside, setIsMouseInside] = useState(false);

  const careers = careersMock.map((career, index) => (
    <Carousel.Slide key={index}>
      <Flex p={'md'} gap={"md"} direction={'column'} bg={'dark.6'} style={{
        borderRadius: "4px"
      }}>
        <Group>

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
        </Group>
        <Stack px={"sm"} gap={"xs"}>
          <Text fz={"sm"} lh={'xs'}>
            {career.description}
          </Text>
          <Group gap={"xs"}>
            {career.competencias.slice(0, 5).map((comp, index) => (
              <Badge variant="outline" key={index}>{comp}</Badge>
            ))}
            {career.competencias.length > 5 && (
              <HoverCard width={200} position="bottom" withArrow shadow="md">
                <HoverCard.Target>
                  <Badge variant="light">
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
      </Flex>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        classNames={classes}
        w={"60vw"}
        withIndicators
        withControls={false}
        m={"auto"}
        loop
        height={"max-content"}
        slideGap={"xs"}
        plugins={[autoplay.current]}
        onMouseEnter={() => {
          setIsMouseInside(true);
          autoplay.current.stop()
        }}
        onMouseLeave={() => {
          setIsMouseInside(false);
          autoplay.current.play()
        }}
        onPointerDown={() => autoplay.current.stop()}
        onPointerUp={() => {
          if (!isMouseInside) autoplay.current.play();
        }}
      >
        {careers}
      </Carousel>
    </>
  );
}
