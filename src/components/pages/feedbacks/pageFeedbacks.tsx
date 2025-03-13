import { testimonialsMock } from "@/mocks/testimonials.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Avatar, AvatarGroup, Center, Flex, Group, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface Props {
  triggerGSAP: boolean;
}

export default function PageFeedbacks({ triggerGSAP }: Props) {
  const { isDesktop } = themeDevices();

  const testimonials = testimonialsMock.map((testimonial, index) => (
    <SwiperSlide key={index}>
      <Stack h={"100%"} align={"center"} justify={"center"} ta={"center"} mb={"50"} gap={isDesktop ? "lg" : "xl"}>
        <AvatarGroup spacing={"40"} >
          <Avatar
            src={testimonial.companyLogo}
            size={100} />
          <Avatar
            src={testimonial.picture}
            size={100} />
        </AvatarGroup>
        <Stack gap={"0"} align={"center"}>
          <Group gap={"xs"}>
            {testimonial.socials
              .map((social, index) => {
                const { hovered, ref } = useHover();

                return (
                  <ActionIcon key={index} ref={ref} component={"a"} href={social.url} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"}>
                    <social.icon />
                  </ActionIcon>
                )
              })}
          </Group>
          <Text fw={"bold"} fz={"h3"} c={"defaultColor"}>{testimonial.name}</Text>
          <Text c={"dimmed"} inline>{`${testimonial.position} na ${testimonial.company}`}</Text>
        </Stack>
        <Text fz={isDesktop ? "h3" : "h4"} w={isDesktop ? "40vw" : "90vw"}>"{testimonial.feedback}"</Text>
      </Stack>
    </SwiperSlide>
  ));

  return (
    <>
      <Flex w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} flex={"1"} justify={"center"} align={"center"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Center w={isDesktop ? "40vw" : "90vw"}>
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
              {testimonials}
            </Swiper>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
