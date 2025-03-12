import { faqsMock } from "@/mocks/faq.mock";
import themeDevices from "@/styles/themeDevices";
import { Accordion, Text } from "@mantine/core";
import { IconArrowDownLeft, } from "@tabler/icons-react";
import { useState } from "react";

export default function FaqAccordion() {
  const { isMobile } = themeDevices();
  const [openedItem, setOpenedItem] = useState<string | null>(faqsMock[0]?.id || null);

  const items = faqsMock.map((item, index) => (
    <Accordion.Item
      value={item.id}
      key={index}
      onMouseEnter={() => setOpenedItem(item.id)}
      onMouseLeave={() => setOpenedItem(faqsMock[0]?.id)}
    >
      <Accordion.Control pos={"relative"} style={{
        cursor: "default",
      }}>
        <Text fw={"bold"} c={"defaultColor"} inline={isMobile}>
          {item.question}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Text fz={"sm"} lh={"xs"} mr={'28'}>
          {item.answer}
        </Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
      <Accordion
        w={"100%"}
        value={openedItem}
        variant={"separated"}
        transitionDuration={400}
        chevron={<IconArrowDownLeft color="grey" style={{
          rotate: "180deg",
          transition: "0.4s ease",
        }} />}
      >
        {items}
      </Accordion>
    </>
  );
}
