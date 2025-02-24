import { useActions } from "@/mocks/actions.mock";
import { Spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import classes from "./customSpotlight.module.css"

export default function CustomSpotlight() {
  const actions = useActions();

  return (
    <Spotlight
      classNames={classes}
      actions={actions}
      nothingFound="Não encontrado..."
      shortcut="ctrl+k"
      searchProps={{
        leftSection: <IconSearch size={22} />,
        placeholder: "Pesquisar...",
      }}
    />
  );
}
