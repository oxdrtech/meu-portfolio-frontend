import { testimonialsMock } from "@/mocks/testimonials.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Avatar, AvatarGroup, Center, Flex, Group, Stack, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  triggerGSAP: boolean;
}

export default function PageFeedbacks({ triggerGSAP }: Props) {
  const { isDesktop, isMobile } = themeDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap.set(".containerFeedbacks", {
        display: "flex",
        yPercent: -100,
        opacity: 0,
      });
      gsap.set(".objectFeedbacks", {
        display: "flex",
        yPercent: 100,
        opacity: 0,
      });

      gsap.timeline()
        .to(".containerFeedbacks", {
          delay: .1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        })
        .to(".objectFeedbacks", {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });
    } else {
      gsap.to(".containerFeedbacks", {
        opacity: 0,
        duration: 0.25,
        display: "none",
      });
    }
  }, [triggerGSAP]);

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
        <Text fz={isDesktop ? "h3" : "h4"}>"{testimonial.feedback}"</Text>
      </Stack>
    </SwiperSlide>
  ));

  return (
    <>
      <Flex ref={gsapRef} w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex className={"containerFeedbacks"} display={"none"} m={"56 10 10 10"} flex={"1"} justify={"center"} align={"center"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Text pos={"absolute"} fz={isDesktop ? "60vh" : isMobile ? "20vh" : "40vh"} fw={"bolder"} c={"#4f542f"} left={0} top={isDesktop ? -50 : 0} ml={"xl"} opacity={.3} inline style={{
            zIndex: -1,
          }}>RECOMENDÇOES</Text>
          <Stack h={"100%"} px={"lg"} align={"center"} justify={isMobile ? "center" : "flex-end"} pb={isMobile ? "0" : "100"} gap={isMobile ? "lg" : "xl"}>
            <Group component={"span"} gap={"sm"} style={{
              overflow: "hidden",
            }}>
              <Center className={"objectFeedbacks"} display={"none"} w={isDesktop ? "60vw" : isMobile ? "90vw" : "70vw"}>
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
            </Group>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
