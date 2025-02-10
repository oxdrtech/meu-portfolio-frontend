import themeDevices from "@/styles/themeDevices";
import { Career } from "@/types/career";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { ActionIcon, Avatar, Badge, Button, Card, Center, Flex, Group, Menu, Modal, Paper, Stack, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconListDetails, IconRefresh, IconSettings } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalPatchStatus from "../career/modals/modalPatchStatus";

interface Props {
  careers: Career[];
}

export default function PagePrivateCareers({ careers }: Props) {
  const { isMobile } = themeDevices();
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [searchName, setSearchName] = useState<string>("");

  const handleOpen = (career: any) => {
    setSelectedCareer(career);
    open();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const filteredCareers = careers?.filter((career: Career) => {
    const matchesSearchTerm = career.CAREER_NAME.toLowerCase().includes(searchName.toLowerCase());
    return matchesSearchTerm;
  });

  const rows = filteredCareers?.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Flex gap="sm" align='center'>
          <Avatar size={35} src={`${API_BASE_URL}${row.CAREER_COMPANY_LOGO}`} />
          <Flex gap='xs' direction='column'>
            <Text fz="sm" inline pl='3px'>
              {
                row.CAREER_NAME
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
              }
            </Text>
            <Group hiddenFrom="md" fz="xs">
              {
                row.CAREER_STATUS === 'APPROVED'
                  ? <Badge variant='default' c='green'>ativo</Badge>
                  : row.CAREER_STATUS === 'PENDING'
                    ? <Badge variant='default' c='yellow'>pendente</Badge>
                    : <Badge variant='default' c='dimmed'>desativ.</Badge>
              }
            </Group>
          </Flex>
        </Flex>
      </Table.Td>
      <Table.Td visibleFrom="md">{row.CAREER_COMPANY}</Table.Td>
      <Table.Td visibleFrom="md">
        <Group fz="sm">
          {
            row.CAREER_STATUS === 'APPROVED'
              ? <Badge variant='default' c='green'>ativo</Badge>
              : row.CAREER_STATUS === 'PENDING'
                ? <Badge variant='default' c='yellow'>pendente</Badge>
                : <Badge variant='default' c='dimmed'>desativ.</Badge>
          }
        </Group>
      </Table.Td>
      <Table.Td >
        <Group gap={0} justify="flex-end" mr={10}>
          <Menu transitionProps={{ transition: 'pop' }} withArrow position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component='a' href={`/career/${row.id}`} leftSection={<IconListDetails size={20} />}>Detalhes</Menu.Item>
              <Menu.Item disabled={session?.user.USER_ROLE === "USER"} onClick={() => handleOpen(row)} leftSection={<IconSettings size={20} />}>Alterar Status</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr >
  ));

  return (
    <>
      <Paper w={isMobile ? '100%' : '80%'} h='100%' m={"auto"}>
        <Stack mb={isMobile ? '80' : '0'}>
          <Flex gap={15}>
            <TextInput
              w='auto'
              type="search"
              placeholder="Buscar pelo nome"
              style={{ flexGrow: 1 }}
              value={searchName}
              onChange={handleSearchChange}
            />
            <Flex gap={15}>
              <Button onClick={() => window.location.reload()}>
                <IconRefresh size={20} />
                <Center visibleFrom="md">Recarregar</Center>
              </Button>
            </Flex>
          </Flex>
          <Stack align='center' justify='center'>
            {filteredCareers.length <= 0 ? (
              <Card w='100%' h='20vh' ta='center'>
                <Text m='auto' c='dimmed'>Nada aqui ainda.</Text>
              </Card>
            ) : (
              <Paper w='100%' withBorder radius='md' style={{ overflow: 'hidden' }}>
                <Table.ScrollContainer minWidth={300} h='auto' mah='50vh' type='native' >
                  <Table verticalSpacing="sm" striped highlightOnHover withRowBorders={false}>
                    <Table.Thead pos='sticky' style={{ backdropFilter: `blur(100px)` }} >
                      <Table.Tr>
                        <Table.Th>Nome</Table.Th>
                        <Table.Th visibleFrom="md">Empresa</Table.Th>
                        <Table.Th visibleFrom="md">Status</Table.Th>
                        <Table.Th ta='end' />
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </Table.ScrollContainer>
              </Paper>
            )}
          </Stack>
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
          <ModalPatchStatus career={selectedCareer} />
        </Modal>
      </Paper>
    </>
  );
}
