import { Button, Select, Stack, Text } from "@mantine/core"
import { IconCircleCheckFilled } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import usePatch from "@/hooks/usePatch";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { Contact, ContactPost } from "@/types/contact";
import { schemaContact } from "@/schemas/contact/schemaContact";
import CustomNotification from "@/components/_ui/notification/customNotification";

interface Props {
  contact?: Contact;
}

export default function ModalPatchStatus({ contact }: Props) {
  const { data: session } = useSession();
  const { handleSubmit, control, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaContact),
    defaultValues: {
      status: contact?.status === "responded" ? "rejected" : "responded",
    },
  });

  const watchData = watch();
  const { isUpdating, response, error, sendRequest } = usePatch<ContactPost, Contact>(`${API_BASE_URL}/contacts/update/${contact?.id}`, watchData, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  });

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: "Erro",
        message: "Não foi possível alterar o status desse contato, tente novamente mais tarde.",
      });
    }
    if (response) {
      CustomNotification({
        title: "Sucesso",
        message: "Status atualizado com sucesso!",
        reload: true,
      });
    }
  }, [response, error]);

  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="#DAFF01" size={100} />
        <Text ta="center">Status atualizado</Text>
        <Text ta="center" c="dimmed">O status do contato foi atualizada com sucesso.</Text>
      </Stack>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => <Select
            {...field}
            label="Status"
            allowDeselect={false}
            data={[
              { value: "responded", label: "respondido", disabled: contact?.status === "responded" },
              { value: "rejected", label: "rejeitado", disabled: contact?.status === "rejected" },
              { value: "pending", label: "pending", disabled: contact?.status === "pending" },
            ]}
          />}
        />
        <Button
          type={"submit"}
          fullWidth
          variant={"light"}
          mt="md"
          loading={isUpdating}
        >
          Salvar
        </Button>
      </form >
    </>
  );
}
