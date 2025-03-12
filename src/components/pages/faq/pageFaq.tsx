import themeDevices from "@/styles/themeDevices";
import { Flex, Stack } from "@mantine/core";
import FaqAccordion from "./accordion/faqAccordion";

export default function PageFaq() {
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
          <Stack w={isDesktop ? "60vw" : "90vw"} h={"100%"} align={"center"} justify={"center"} pb={isDesktop ? "80" : ""} gap={isMobile ? "lg" : "xl"}>
            <FaqAccordion />
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
