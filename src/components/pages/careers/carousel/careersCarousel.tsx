import { careersMock } from "@/mocks/careers.mock";
import { formatDate } from "@/utils/formatDate";
import { Avatar, Center, Flex, Group, Modal, Stack, Text } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Career } from "@/types/career";
import CareersModal from "./modal/careersModal";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import themeDevices from "@/styles/themeDevices";

export default function CareerCarousel() {
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<Career | null>(null);

  const handleOpen = (content: Career) => {
    setModalContent(content);
    open();
  };

  const careers = careersMock.map((career, index) => (
    <SplideSlide key={index}>
      <Flex onClick={() => handleOpen(career)} p={"sm"} gap={"md"} align={"center"} mb={"40"} bg={"dark.6"} style={{
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
    </SplideSlide>
  ));

  return (
    <>
      <Center>
        <Splide
          options={{
            width: isMobile ? "90vw" : "80vw",
            arrows: false,
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            pauseOnFocus: true,
            type: "loop",
            perPage: 1,
            perMove: 1,
            speed: 800,
            pagination: false,
          }}
        >
          {careers}
        </Splide>
      </Center>
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
