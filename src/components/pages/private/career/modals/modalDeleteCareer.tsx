import CustomNotification from "@/components/_ui/notification/customNotification";
import useDelete from "@/hooks/useDelete";
import { Career } from "@/types/career";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { Button, Stack, Text } from "@mantine/core";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  career: Career;
}

export default function ModalDeleteCareer({ career }: Props) {
  const { data: session } = useSession();;

  const { isDeleting, response, error, sendRequest } = useDelete<Career>(`${API_BASE_URL}/careers/delete/${career?.id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  });

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: 'Erro',
        message: 'Não foi possível deletar a carreira, tente novamente mais tarde.',
      });
    }
    if (response) {
      CustomNotification({
        title: 'Sucesso',
        message: 'Carreira deletada com sucesso!',
        reload: true,
      });
    }
  }, [response, error]);

  if (response) {
    return (
      <Stack align="center" gap={0}>
        <IconCircleCheckFilled color="green" size={100} />
        <Text ta='center'>Carreira deletada</Text>
        <Text ta='center' c='dimmed'>A carreira foi deletada com sucesso.</Text>
      </Stack>
    );
  }

  return (
    <>
      <form onSubmit={sendRequest}>
        <Stack align="center" gap={0}>
          <Text ta='center'>Deletar carreira?</Text>
          <Text ta='center' size="sm" c='dimmed'>Tem certeza que deseja deletar essa carreira?</Text>
        </Stack>
        <Button
          type='submit'
          fullWidth
          mt="md"
          fw={500}
          color='red'
          loading={isDeleting}
        >
          Deletar
        </Button>
      </form>
    </>
  );
}
