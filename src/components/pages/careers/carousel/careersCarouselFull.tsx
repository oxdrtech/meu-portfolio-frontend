import { careersMock } from '@/mocks/careers.mock';
import { formatDate } from '@/utils/formatDate';
import { Avatar, Badge, Center, Flex, Group, HoverCard, Paper, Stack, Text } from '@mantine/core';
import { IconBriefcaseFilled } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function CareerCarouselFull() {

  const careers = careersMock.map((career, index) => (
    <SwiperSlide key={index}>
      <Paper shadow='lg'>
        <Flex p={'md'} gap={"md"} direction={'column'} bg={'dark.6'} mb={"50"} style={{
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
      </Paper>
    </SwiperSlide>
  ));

  return (
    <>
      <Center w={"80vw"}>
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
    </>
  );
}
