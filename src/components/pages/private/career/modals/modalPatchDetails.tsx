import CustomNotification from "@/components/_ui/notification/customNotification";
import usePatch from "@/hooks/usePatch";
import { schemaCareer } from "@/schemas/career/schemaCareer";
import { Career, CareerPost } from "@/types/career";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
  career: Career;
  inputLabel: string;
  inputValue: string;
  inputField: keyof CareerPost;
}

export default function ModalPatchDetails({ career, inputLabel, inputValue, inputField }: Props) {
  const { data: session } = useSession();
  const { control, handleSubmit, watch } = useForm<CareerPost>({
    mode: "onChange",
    resolver: yupResolver(schemaCareer),
    defaultValues: {
      [inputField]: inputValue,
    },
  });

  const watchData = watch();
  const { isUpdating, response, error, sendRequest } = usePatch<CareerPost, Career>(`${API_BASE_URL}/careers/update/${career.id}`, watchData, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: 'Erro ao editar carreira',
        message: 'Tente novamente mais tarde.',
      });
    }
    if (response) {
      CustomNotification({
        title: 'Sucesso',
        message: 'Carreira editada com sucesso!',
        reload: true,
      });
    }
  }, [response, error]);

  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center'>Carreira atualizada</Text>
        <Text ta='center' c='dimmed'>As Informações da carreira foram atualizadas com sucesso!</Text>
      </Stack>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Stack align="center" gap={0} mb={10}>
          <Text ta='center'>Editar {inputLabel}</Text>
          <Text ta='center' size="sm" c='dimmed'>Digite no campo abaixo o novo valor</Text>
        </Stack>
        {inputField === "CAREER_DESCRIPTION" ? (
          <Controller
            name="CAREER_DESCRIPTION"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Digite a descrição..."
                minRows={5}
                autosize
                value={field.value || inputValue}
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
            fullWidth
            variant={"light"}
          >
            Salvar
          </Button>
        </Group>
      </form>
    </>
  );
}
