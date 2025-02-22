import themeDevices from "@/styles/themeDevices";
import { Flex, Highlight, Paper, Stack } from "@mantine/core";
import CareersAccordion from "./accordion/careersAccordion";
import CareerCarousel from "./carousel/careersCarousel";

export default function PageCareers() {
  const { isMobile, isDesktop } = themeDevices();

  return (
    <>
      <Flex w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} flex={"1"} justify={"center"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <Stack h={"100%"} px={"lg"} align={"center"} justify={isDesktop ? "flex-end" : "center"} pb={isDesktop ? "80" : ""} gap={"xl"}>
            <Stack w={isMobile ? "90vw" : "80vw"} gap={"0"}>
              <Highlight
                highlight={[
                  "qualidade",
                  "performance",
                  "design",
                ]}
                highlightStyles={{
                  color: "#DAFF01",
                  WebkitBackgroundClip: 'text',
                }}
                fz={isMobile ? "h2" : "h1"}
                fw={"lighter"}
                inline
                style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}
              >
                Há 2 anos desenvolvendo aplicações web para empresas e negócios independentes, unindo qualidade, alta performance, design elegante
              </Highlight>
            </Stack>
            <Paper w={isMobile ? "90vw" : "80vw"} h={1} bg={"defaultColor"} />
            <Stack w={isMobile ? "90vw" : "80vw"}>
              {
                isMobile
                  ? <CareerCarousel />
                  : <CareersAccordion />
              }
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
