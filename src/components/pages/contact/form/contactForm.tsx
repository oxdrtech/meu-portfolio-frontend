import CustomNotification from "@/components/_ui/notification/customNotification";
import usePost from "@/hooks/usePost";
import { schemaContact } from "@/schemas/contact/schemaContact";
import themeDevices from "@/styles/themeDevices";
import { Contact } from "@/types/contact";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ContactForm() {
  const { isMobile } = themeDevices();
  const { control, handleSubmit, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaContact),
  });

  const watchData = watch();
  const { isPosting, response, error, sendRequest } = usePost<Contact, Contact>(`${API_BASE_URL}/contacts/create`, watchData);

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: "Erro ao enviar formulário",
        message: "Tente novamente mais tarde.",
      });
    }
    if (response) {
      CustomNotification({
        title: "Sucesso",
        message: "Formulario enviado com sucesso.",
      });
      // TODO - salvar response em localStorage, pra evitar envios repeditos do mesmo usuario
    }
  }, [response, error]);

  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheck color="#DAFF01" size={100} stroke={"1"} />
        <Stack gap={"xs"}>
          <Text ta='center' c='dimmed'>Formulario enviado com sucesso</Text>
          <Button fullWidth variant="light">Enviar um novo formulário</Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack gap={"xs"} mb={"md"}>
        {
          !isMobile
          && (
            <Title order={2} c={"defaultColor"} style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
              Tem um projeto empolgante e precisa de ajuda?
            </Title>
          )
        }
        <Title order={3} fz={isMobile ? "h4" : ""} c={"defaultColor"} style={{
          textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
        }}>
          Preenche o formulário abaixo com nome e whatsapp que eu entro em contato.
        </Title>
      </Stack>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Stack gap="lg">
          <SimpleGrid cols={{ base: 1, sm: 1 }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Controller
                name="contact_name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Nome*"
                    required
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value || "")}
                  />
                )}
              />
              <Controller
                name="contact_phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Whatsapp*"
                    required
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value || "")}
                  />
                )}
              />
            </SimpleGrid>
            <Controller
              name="contact_projectDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Me fala um pouco do teu projeto"
                  minRows={2}
                  autosize
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value || "")}
                />
              )}
            />
          </SimpleGrid>
          <Button
            type={"submit"}
            variant={"light"}
            fullWidth
            loading={isPosting}
          >
            Enviar formulário
          </Button>
        </Stack>
      </form>
    </>
  );
}
