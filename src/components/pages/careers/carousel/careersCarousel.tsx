import { careersMock } from "@/mocks/careers.mock";
import { formatDate } from "@/utils/formatDate";
import { Avatar, Center, Flex, Group, Modal, Paper, Stack, Text } from "@mantine/core";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Career } from "@/types/career";
import CareersModal from "./modal/careersModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function CareerCarousel() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<Career | null>(null);

  const handleOpen = (content: Career) => {
    setModalContent(content);
    open();
  };

  const careers = careersMock.map((career, index) => (
    <SwiperSlide key={index}>
      <Paper shadow={"sm"}>
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
      </Paper>
    </SwiperSlide>
  ));

  return (
    <>
      <Center w={"90vw"}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
        >
          {careers}
        </Swiper>
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
