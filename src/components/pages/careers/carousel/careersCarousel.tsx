import { careersMock } from '@/mocks/careers.mock';
import { formatDate } from '@/utils/formatDate';
import { Carousel } from '@mantine/carousel';
import { Avatar, Flex, Group, Modal, Stack, Text } from '@mantine/core';
import { IconBriefcaseFilled } from '@tabler/icons-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState } from 'react';
import classes from "./careersCarousel.module.css"
import { useDisclosure } from '@mantine/hooks';
import { Career } from '@/types/career';
import CareersModal from './modal/careersModal';

export default function CareerCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<Career | null>(null);

  const handleOpen = (content: Career) => {
    setModalContent(content);
    open();
  };

  const careers = careersMock.map((career, index) => (
    <Carousel.Slide key={index}>
      <Flex onClick={() => handleOpen(career)} p={'sm'} gap={"md"} align={"center"} bg={'dark.6'} style={{
        borderRadius: "4px"
      }}>
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
  ));

  return (
    <>
      <Carousel
        classNames={classes}
        withIndicators
        withControls={false}
        loop
        height={"max-content"}
        slideGap={"xs"}
        plugins={[autoplay.current]}
        onPointerDown={() => autoplay.current.stop()}
        onPointerUp={() => autoplay.current.play()}
      >
        {careers}
      </Carousel>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        transitionProps={{
          transition: "scale",
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{
          zIndex: 1000,
        }}
      >
        {
          modalContent && (
            <CareersModal career={modalContent} />
          )
        }
      </Modal>
    </>
  );
}
