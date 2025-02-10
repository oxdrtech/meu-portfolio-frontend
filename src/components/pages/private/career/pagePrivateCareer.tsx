import { ActionIcon, Badge, Card, Flex, Group, Modal, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Career } from "@/types/career";
import themeDevices from "@/styles/themeDevices";
import MenuNavigation from "@/components/_ui/menuNavigation/menuNavigation";
import ModalPatchStatus from "./modals/modalPatchStatus";
import ModalDeleteCareer from "./modals/modalDeleteCareer";
import CareerDetail from "./careerDetail";

interface Props {
  career: Career;
}

export default function PagePrivateCareer({ career }: Props) {
  const { data: session } = useSession();
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<'status' | 'delete' | ''>('');

  const handleOpenModal = (content: 'status' | 'delete') => {
    setModalContent(content);
    open();
  };

  return (
    <>
      <Stack h='100%' align="center" >
        <MenuNavigation />
        <Card w='100%' shadow="sm" padding="sm" radius="md" withBorder>
          <Flex direction={isMobile ? 'row' : 'column'} gap='xs'>
            <Text fz='h1' inline>{career.CAREER_NAME.toUpperCase()}</Text>
            <Group flex={1} justify="space-between">
              {
                career.CAREER_STATUS === 'APPROVED'
                  ? <Badge variant='default' c='green'>ativo</Badge>
                  : career.CAREER_STATUS === 'PENDING'
                    ? <Badge variant='default' c='yellow'>pendente</Badge>
                    : <Badge variant='default' c='dimmed'>desativ.</Badge>
              }
              <Group gap={5}>
                <Tooltip color="gray" label='Alterar status' position="bottom">
                  <ActionIcon disabled={session?.user.USER_ROLE === "USER"} onClick={() => handleOpenModal('status')} variant="filled" aria-label="Status">
                    <IconSettings size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip color="gray" label='Deletar produto' position="bottom">
                  <ActionIcon onClick={() => handleOpenModal('delete')} variant="filled" aria-label="Delete">
                    <IconTrash size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Flex>
        </Card>
        <Paper w={isMobile ? '100%' : '80%'} h='100%' >
          <CareerDetail career={career} />
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        closeOnClickOutside={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        {modalContent === 'status' && <ModalPatchStatus career={career} />}
        {modalContent === 'delete' && <ModalDeleteCareer career={career} />}
      </Modal>
    </>
  );
}
