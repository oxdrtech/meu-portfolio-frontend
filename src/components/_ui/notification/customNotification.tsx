import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface Props {
  title: string | undefined;
  message: string;
  reload?: boolean;
}

export default function CustomNotification({ title, message, reload }: Props) {
  const notificationColor = title === 'Sucesso' ? '#DAFF01' : 'red';
  const notificationIcon = title === 'Sucesso' ? <IconCheck /> : <IconX />;

  notifications.show({
    title: title,
    message: message,
    position: 'top-center',
    autoClose: 3000,
    c: notificationColor,
    icon: notificationIcon,
    onClose() {
      if (reload) window.location.reload();
    }
  });
}
