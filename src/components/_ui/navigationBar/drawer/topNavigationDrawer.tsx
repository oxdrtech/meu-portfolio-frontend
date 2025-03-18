import { useActions } from "@/mocks/actions.mock";
import { Button, Stack } from "@mantine/core";
import classes from "./topNavigationDrawer.module.css";

export default function TopNavigationDrawer() {
  const actions = useActions();

  return (
    <Stack>
      {actions.map((action) => (
        <Button
          key={action.id}
          classNames={classes}
          onClick={action.onClick}
          variant={"default"}
          rightSection={action.leftSection}
          justify="space-between"
        >
          {action.description}
        </Button>
      ))}
    </Stack>
  );
}
