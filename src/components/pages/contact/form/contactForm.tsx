import { useState, useEffect } from "react";
import CustomNotification from "@/components/_ui/notification/customNotification";
import usePost from "@/hooks/usePost";
import { schemaContact } from "@/schemas/contact/schemaContact";
import themeDevices from "@/styles/themeDevices";
import { Contact, ContactPost } from "@/types/contact";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, Modal, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMailFast } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

export default function ContactForm() {
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const [formAlreadySent, setFormAlreadySent] = useState(false);

  useEffect(() => {
    const hasSentForm = localStorage.getItem("contactFormHasSended") === "true";
    setFormAlreadySent(hasSentForm);
  }, []);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schemaContact),
  });

  const watchData = watch();
  const { isPosting, response, error, sendRequest } = usePost<ContactPost, { contact: Contact, discordStatus: number }>(
    `${API_BASE_URL}/contacts/create`,
    watchData
  );

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: `Erro ao enviar formulário`,
        message: "Tente novamente mais tarde.",
      });
    }
    if (response) {
      CustomNotification({
        title: "Sucesso",
        message: "Formulário enviado com sucesso.",
      });

      if (response.data.discordStatus === 204) {
        localStorage.setItem("contactFormHasSended", "true");
        setFormAlreadySent(true);
      }
    }
  }, [response, error]);

  if (formAlreadySent) {
    return (
      <Stack className={"objectContact"} display={"none"} h={"100"} align={"center"} gap={"md"} justify={"center"}>
        <Group gap={"6"}>
          <Text ta={"center"} c={"defaultColor"} fz={isMobile ? "" : "h3"} style={{
            textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
          }}>
            Formulário enviado
          </Text>
          <IconMailFast size={28} color={"#DAFF01"} />
        </Group>
        <Stack gap={"6"}>
          <Text w={isMobile ? "" : "22rem"} ta={"center"} c={"dimmed"} fz={"sm"} inline>
            Seu formulário foi enviado e em breve será analisado. Tempo estimado do contato é de 24h
          </Text>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Group component={"span"} gap={"sm"} style={{
        overflow: "hidden",
      }}>
        <Stack className={"objectContact"} display={"none"} w={isMobile ? "90vw" : "80vw"} mih={"100"} justify={"center"}>
          <Title
            order={2}
            c={"defaultColor"}
            fz={isMobile ? "h3" : ""}
            style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}
          >
            Tem um projeto empolgante e precisa de ajuda?
          </Title>
          <Button onClick={open} variant={"light"}>
            Preencher formulário
          </Button>
        </Stack>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={!isMobile}
        withCloseButton={isMobile}
        size={"auto"}
        centered={!isMobile}
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack w={"80vw"}>
          <Title
            order={3}
            fz={isMobile ? "h4" : ""}
            c={"defaultColor"}
            ta={"center"}
            py={"sm"}
            style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}
          >
            Preenche o formulário abaixo com nome e WhatsApp que eu entro em contato.
          </Title>
          <form onSubmit={handleSubmit(sendRequest)}>
            <Stack gap="lg">
              <SimpleGrid cols={{ base: 1, sm: 1 }}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="Nome"
                        required
                        value={field.value || ""}
                        onChange={(value) => field.onChange(value || "")}
                        error={errors.name?.message || ""}
                      />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="WhatsApp"
                        required
                        maxLength={14}
                        value={field.value || ""}
                        onChange={(value) => field.onChange(value || "")}
                        error={errors.phoneNumber?.message || ""}
                      />
                    )}
                  />
                </SimpleGrid>
                <Controller
                  name="projectDescription"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Aqui você pode descrever um pouco do seu projeto ou ideia..."
                      required
                      minRows={10}
                      maxLength={500}
                      autosize
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value || "")}
                      error={errors.projectDescription?.message || ""}
                    />
                  )}
                />
              </SimpleGrid>
              <Button type={"submit"} variant={"light"} fullWidth loading={isPosting}>
                Enviar formulário
              </Button>
            </Stack>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
