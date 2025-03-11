import CustomNotification from "@/components/_ui/notification/customNotification";
import usePatch from "@/hooks/usePatch";
import { schemaContact } from "@/schemas/contact/schemaContact";
import { Contact, ContactPost } from "@/types/contact";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  contact: Contact;
  inputLabel: string;
  inputValue: string;
  inputField: keyof ContactPost;
}

export default function ModalPatchDetails({ contact, inputLabel, inputValue, inputField }: Props) {
  const { data: session } = useSession();
  const { control, handleSubmit, watch } = useForm<ContactPost>({
    mode: "onChange",
    resolver: yupResolver(schemaContact),
    defaultValues: {
      [inputField]: inputValue,
    },
  });

  const watchData = watch();
  const { isUpdating, response, error, sendRequest } = usePatch<ContactPost, Contact>(`${API_BASE_URL}/contacts/update/${contact.id}`, watchData, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: error.response?.status === 409 ? "Erro de confilto" : "Erro ao editar contato",
        message: error.response?.status === 409 ? "Você está tantando usar um telefone cadastrado em outro contato." : "Tente novamente mais tarde.",
      });
    }
    if (response) {
      CustomNotification({
        title: "Sucesso",
        message: "Contato editado com sucesso!",
        reload: true,
      });
    }
  }, [response, error]);


  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="#DAFF01" size={100} />
        <Text ta="center">Contato atualizado</Text>
        <Text ta="center" c="dimmed">As Informações do contato foram atualizadas com sucesso!</Text>
      </Stack>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Stack align="center" gap={0} mb={10}>
          <Text ta="center">Editar {inputLabel}</Text>
          <Text ta="center" size="sm" c="dimmed">Digite no campo abaixo o novo valor</Text>
        </Stack>
        {inputField === "projectDescription" ? (
          <Controller
            name="projectDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Digite a descrição..."
                minRows={10}
                autosize
                value={field.value || inputValue as string}
                onChange={(value) => field.onChange(value || "")}
              />
            )}
          />
        ) : (
          <Controller
            name={inputField}
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value || inputValue}
                onChange={(value) => field.onChange(value || "")}
              />
            )}
          />
        )}
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            loading={isUpdating}
            color={"defaultColor"}
            variant={"light"}
            fullWidth
          >
            Salvar
          </Button>
        </Group>
      </form>
    </>
  );
}
