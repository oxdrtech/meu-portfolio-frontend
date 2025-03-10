import themeDevices from "@/styles/themeDevices";
import { Avatar, BackgroundImage, Button, Flex, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ContactForm from "./form/contactForm";
import SocialButtons from "@/components/_ui/socialButtons/socialButtons";

export default function PageContact() {
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);

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
              <Stack w={isMobile ? "90vw" : "80vw"} gap={isMobile ? "" : "0"}>
                {
                  isMobile
                    ? (
                      <>
                        <Title order={3} fz={"h4"} c={"defaultColor"} style={{
                          textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
                        }}>
                          Tem um projeto empolgante e precisa de ajuda?
                        </Title>
                        <Button variant="light" onClick={open}>
                          {isMobile
                            ? "Preencer formulário"
                            : "Entrar em contato"
                          }
                        </Button>
                      </>
                    )
                    : <ContactForm />
                }
              </Stack>
              <Stack w={"80vw"} align={"center"} ta={"center"} mt={"md"} gap={"xs"}>
                <Avatar src={"https://avatars.githubusercontent.com/u/83263335?v=4"} size={"50"} />
                <Stack align={"center"} gap={"0"}>
                  <SocialButtons />
                  <Text ff={"monospace"} fz={"xs"}>
                    Desenvolvido por {" "}
                    <Text fz={"xs"} component={"a"} href={"https://github.com/DDR23"} c={"defaultColor"}>DDR23</Text>
                  </Text>
                  <Text ff={"monospace"} fz={"10"} c={"dimmed"}>© {new Date().getFullYear()}. Todos os direitos reservados.</Text>
                </Stack>
              </Stack>
            </Stack>
          </BackgroundImage>
        </Flex>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        transitionProps={{
          transition: "scale",
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
        style={{
          zIndex: 1000,
        }}>
        <ContactForm />
      </Modal>
    </>
  );
}
