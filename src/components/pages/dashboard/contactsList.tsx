import React, { useState } from "react";
import { ActionIcon, Badge, Button, Card, Center, Checkbox, Flex, Group, Menu, Modal, Paper, Stack, Table, Text, TextInput } from "@mantine/core";
import { IconDots, IconFilter, IconListDetails, IconRefresh, IconSettings } from "@tabler/icons-react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { Contact } from "@/types/contact";
import { formatPhone } from "@/utils/formatPhone";
import ModalPatchStatus from "./contact/modals/modalPatchStatus";

interface Props {
  contacts: Contact[]
}

export default function ContactsList({ contacts }: Props) {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedContact, setselectedContact] = useState<Contact>();
  const [searchId, setSearchId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { copy } = useClipboard();

  const status = Array.from(new Set(contacts.map(contact => contact.status)));

  const handleOpen = (contact: Contact) => {
    setselectedContact(contact);
    open();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  const handleStatusToggle = (status?: string) => {
    if (!status) return;
    setSelectedStatus(prevStatus =>
      prevStatus.includes(status)
        ? prevStatus.filter(s => s !== status)
        : [...prevStatus, status]
    );
  };

  const filteredContacts = contacts?.filter((contact: Contact) => {
    const matchesSearchTerm = contact.id.includes(searchId);
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(contact.status);
    return matchesSearchTerm && matchesStatus;
  });

  const rows = filteredContacts?.map((row, index) => {
    const isCopied = copiedId === row.id;

    const handleCopy = (id: string) => {
      copy(id);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 500);
    };

    return (
      <Table.Tr key={index}>
        <Table.Td>
          <Flex gap="sm" align="center">
            <Flex gap="xs" direction="column">
              <Text
                onClick={() => handleCopy(row.id)}
                fz={"xs"}
                c={isCopied ? "#DAFF01" : "dimmed"}
                inline
                style={{
                  cursor: "pointer",
                }}>{isCopied ? 'copiado' : row.id}</Text>
              <Text inline pl="3px">
                {
                  row.name
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ")
                }
              </Text>
              <Group hiddenFrom="md" fz="xs">
                {
                  row.status === "pending"
                    ? <Badge variant="default" c="#fc8a08">Pendente</Badge>
                    : row.status === "responded"
                      ? <Badge variant="default" c="#DAFF01">Respondido</Badge>
                      : <Badge variant="default" c="red">Rejeitado</Badge>
                }
              </Group>
            </Flex>
          </Flex>
        </Table.Td>
        <Table.Td visibleFrom="md">
          <Text>{formatPhone(row.phoneNumber)}</Text>
        </Table.Td>
        <Table.Td visibleFrom="md">
          <Group fz="sm">
            {
              row.status === "pending"
                ? <Badge variant="default" c="#fc8a08">Pendente</Badge>
                : row.status === "responded"
                  ? <Badge variant="default" c="#DAFF01">Respondido</Badge>
                  : <Badge variant="default" c="dimmed">Rejeitado</Badge>
            }
          </Group>
        </Table.Td>
        <Table.Td >
          <Group gap={0} justify="flex-end" mr={10}>
            <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots size={20} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a" href={`/contact/${row.id}`} leftSection={<IconListDetails size={20} />}>Detalhes</Menu.Item>
                <Menu.Item disabled={session?.user.role === "user"} onClick={() => handleOpen(row)} leftSection={<IconSettings size={20} />}>Alterar Status</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Table.Td>
      </Table.Tr >
    )
  });

  return (
    <>
      <Stack w={"80vw"}>
        <Flex gap={15}>
          <TextInput
            w="auto"
            type="search"
            placeholder="Buscar pelo ID"
            style={{ flexGrow: 1 }}
            value={searchId}
            onChange={handleSearchChange}
          />
          <Flex gap={15}>
            <Menu trigger="click-hover" shadow="md">
              <Menu.Target>
                <Button variant={"light"}>
                  <IconFilter size={20} />
                  <Center visibleFrom="md">Filtro</Center>
                </Button>
              </Menu.Target>
              <Menu.Dropdown style={{ maxHeight: 200, overflowY: "auto" }}>
                <Menu.Label>Filtrar por:</Menu.Label>
                {status.map(status => (
                  <Group key={status} align="center" style={{ padding: "5px 10px" }}>
                    <Checkbox
                      checked={selectedStatus.includes(status)}
                      onChange={() => handleStatusToggle(status)}
                      label={status}
                    />
                  </Group>
                ))}
              </Menu.Dropdown>
            </Menu>
            <Button onClick={() => window.location.reload()} variant={"light"}>
              <IconRefresh size={20} />
              <Center visibleFrom="md">Recarregar</Center>
            </Button>
          </Flex>
        </Flex>
        <Stack align="center" justify="center">
          {filteredContacts.length <= 0 ? (
            <Card w="100%" h="20vh" ta="center">
              <Text m="auto" c="dimmed">Nada aqui ainda.</Text>
            </Card>
          ) : (
            <Paper w="100%" withBorder radius="md" style={{ overflow: "hidden" }}>
              <Table.ScrollContainer minWidth={300} h="auto" mah="50vh" type="native" >
                <Table verticalSpacing="sm" striped highlightOnHover withRowBorders={false}>
                  <Table.Thead pos="sticky" style={{ backdropFilter: `blur(100px)` }} >
                    <Table.Tr>
                      <Table.Th>Contato</Table.Th>
                      <Table.Th visibleFrom="md">Telefone</Table.Th>
                      <Table.Th visibleFrom="md">Status</Table.Th>
                      <Table.Th ta="end" />
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
        withCloseButton={false}
        centered
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalPatchStatus contact={selectedContact} />
      </Modal>
    </>
  );
}
