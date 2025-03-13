import themeDevices from "@/styles/themeDevices";
import { Avatar, BackgroundImage, Flex, Paper, Stack, Text, Title } from "@mantine/core";
import SocialButtons from "@/components/_ui/socialButtons/socialButtons";
import ContactForm from "./form/contactForm";
import { useScrambledText } from "@/utils/useScrambledText";

const works = ["DDR23", "André Campos"];

interface Props {
  triggerGSAP: boolean;
}

export default function PageContact({ triggerGSAP }: Props) {
  const { isMobile } = themeDevices();
  const displayText = useScrambledText(works);

  return (
    <>
      <Flex w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} flex={"1"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <BackgroundImage src={"./backgroundGrain.jpg"}>
            <Stack h={"100%"} p={"lg"} align={"center"} justify={"flex-end"} gap={isMobile ? "lg" : "xl"} pb={"56"}>
              <Stack w={isMobile ? "90vw" : "80vw"}>
                <Title order={1} fz={isMobile ? "h2" : ""} style={{
                  textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                }}>
                  Disponível para oportunidades freelance selecionadas
                </Title>
              </Stack>
              <Paper w={isMobile ? "90vw" : "80vw"} h={1} bg={"#C9C9C9"} />
              <ContactForm />
              <Stack w={"80vw"} align={"center"} ta={"center"} mt={"md"} gap={"xs"}>
                <Avatar src={"https://avatars.githubusercontent.com/u/83263335?v=4"} size={"50"} />
                <Stack align={"center"} gap={"0"}>
                  <SocialButtons />
                  <Text ff={"monospace"} fz={"xs"}>
                    Desenvolvido por {" "}
                    <Text fz={"xs"} component={"a"} href={"https://github.com/DDR23"} c={"defaultColor"}>{displayText}</Text>
                  </Text>
                  <Text ff={"monospace"} fz={"10"} c={"dimmed"}>© {new Date().getFullYear()}. Todos os direitos reservados.</Text>
                </Stack>
              </Stack>
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
    </>
  );
}
