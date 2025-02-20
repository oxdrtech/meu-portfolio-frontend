import { careersMock } from '@/mocks/careers.mock';
import { formatDate } from '@/utils/formatDate';
import { Carousel } from '@mantine/carousel';
import { Avatar, Flex, Group, Stack, Text } from '@mantine/core';
import { IconBriefcaseFilled } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import classes from "./careersCarousel.module.css"

export default function CareerCarousel() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const careers = careersMock.map((career, index) => (
    <Carousel.Slide key={index}>
      <Flex px={'sm'} gap={"md"} align={"center"}>
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
    </Carousel.Slide>
  ))
  return (
    <>
      <Carousel
        classNames={classes}
        withIndicators
        withControls={false}
        loop
        height={"max-content"}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {careers}
      </Carousel>
    </>
  );
}
