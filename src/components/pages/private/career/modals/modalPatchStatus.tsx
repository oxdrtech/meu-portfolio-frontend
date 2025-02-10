import { Button, Select, Stack, Text } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Career, CareerPost } from "@/types/career";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import CustomNotification from "@/components/_ui/notification/customNotification";
import { schemaCareer } from "@/schemas/career/schemaCareer";
import usePatch from "@/hooks/usePatch";

interface Props {
  career?: Career;
}

export default function ModalPatchStatus({ career }: Props) {
  const { data: session } = useSession();
  const { handleSubmit, control, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaCareer),
    defaultValues: {
      CAREER_STATUS: career?.CAREER_STATUS === 'APPROVED' ? 'DISABLED' : 'APPROVED',
    },
  });

  const watchData = watch();
  const { isUpdating, response, error, sendRequest } = usePatch<CareerPost, Career>(`${API_BASE_URL}/careers/update/${career?.id}`, watchData, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  });

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: 'Erro',
        message: 'Não foi possível alterar o status dessa carreira, tente novamente mais tarde.',
      });
    }
    if (response) {
      CustomNotification({
        title: 'Sucesso',
        message: 'Status atualizado com sucesso!',
        reload: true,
      });
    }
  }, [response, error]);

  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center'>Carreira atualizada</Text>
        <Text ta='center' c='dimmed'>O status da carreira foi atualizado.</Text>
      </Stack>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendRequest)}>
        <Stack align="center" gap={0}>
          <Text ta='center'>Editar status de {career?.CAREER_NAME}</Text>
          <Text ta='center' size="sm" c='dimmed'>
            {
              career?.CAREER_STATUS === 'APPROVED'
                ? 'Essa carreira está ativada, deseja desativa-la?'
                : career?.CAREER_STATUS === 'PENDING'
                  ? 'Essa carreira ainda está pendente de aprovação, deseja alterar o status?'
                  : 'Essa carreira não está ativada, deseja ativa-la?'
            }
          </Text>
        </Stack>
        <Controller
          name='CAREER_STATUS'
          control={control}
          render={({ field }) => <Select
            {...field}
            label='Status'
            allowDeselect={false}
            data={[
              { value: 'APPROVED', label: 'Ativado', disabled: career?.CAREER_STATUS === 'APPROVED' },
              { value: 'DISABLED', label: 'Desativado', disabled: career?.CAREER_STATUS === 'DISABLED' },
            ]}
          />}
        />
        <Button
          type='submit'
          fullWidth
          mt="md"
          loading={isUpdating}
        >
          Salvar
        </Button>
        <Text ta='center' size="xs" c='dimmed' mt={10}>OBS: Uma carreira desativada fica oculta no site oficial.</Text>
      </form>
    </>
  );
}
