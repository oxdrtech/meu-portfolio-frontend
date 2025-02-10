import { useState } from "react";
import { ActionIcon, Modal, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { Career, CareerPost } from "@/types/career";
import themeDevices from "@/styles/themeDevices";
import ModalPatchDetails from "./modals/modalPatchDetails";

interface Props {
  career: Career;
}

export default function LineDetail({ career }: Props) {
  const { data: session } = useSession();
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const [currentField, setCurrentField] = useState<keyof CareerPost>("CAREER_NAME");
  const [inputValue, setInputValue] = useState<string>("");
  const [inputLabel, setInputLabel] = useState<string>("");

  const handleOpenModal = (label: string, value: string, field: keyof CareerPost) => {
    setInputLabel(label);
    setInputValue(value);
    setCurrentField(field);
    open();
  };

  const renderTextInput = (label: string, value: string, field: keyof CareerPost) => (
    <TextInput
      description={label}
      value={value}
      readOnly
      rightSection={
        <ActionIcon disabled={session?.user.USER_ROLE === "USER"} onClick={() => handleOpenModal(label, value, field)} variant="transparent" c="dimmed" aria-label={label}>
          <IconEdit size={20} />
        </ActionIcon>
      }
    />
  );

  return (
    <>
      <Paper px={isMobile ? '0' : '20'}>
        <SimpleGrid mt={10} mb={isMobile ? '80' : '0'} cols={{ base: 1 }} spacing={20} verticalSpacing={15}>
          {renderTextInput("Nome do cargo", career.CAREER_NAME, "CAREER_NAME")}
          {renderTextInput("Descrição", career.CAREER_DESCRIPTION, "CAREER_DESCRIPTION")}
          {renderTextInput("Empresa", career.CAREER_COMPANY, "CAREER_COMPANY")}
          {renderTextInput("Site da empresa", career.CAREER_COMPANY_SITE, "CAREER_COMPANY_SITE")}
          {renderTextInput("Inicio", career.CAREER_START_DATE, "CAREER_START_DATE")}
          {renderTextInput("Termino", career.CAREER_END_DATE, "CAREER_END_DATE")}
          {renderTextInput("Tipo", career.CAREER_TYPE, "CAREER_TYPE")}
        </SimpleGrid>
      </Paper>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        closeOnClickOutside={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <ModalPatchDetails career={career} inputLabel={inputLabel} inputValue={inputValue} inputField={currentField} />
      </Modal>
    </>
  );
}
