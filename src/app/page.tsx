"use client";
import { Stack } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import Loading from "@/components/_ui/loading/loading";
import PageSkills from "@/components/pages/skills/pageSkills";
import PageCareers from "@/components/pages/careers/pageCareers";
import PageHero from "@/components/pages/hero/pageHero";
import PageContact from "@/components/pages/contact/pageContact";
import TopNavigation from "@/components/_ui/navigationBar/topNavigation";
import PageFaq from "@/components/pages/faq/pageFaq";
import PageFeedbacks from "@/components/pages/feedbacks/pageFeedbacks";

export default function Home() {
  const [renderCompleted, setRenderCompleted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    carreira: useRef<HTMLDivElement>(null),
    habilidades: useRef<HTMLDivElement>(null),
    recomendações: useRef<HTMLDivElement>(null),
    duvidas: useRef<HTMLDivElement>(null),
    contato: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (!renderCompleted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section") || "";
            setActiveSection(section);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionsRef).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [renderCompleted]);

  return (
    <Stack>
      <Loading onComplete={() => setRenderCompleted(true)} />
      <TopNavigation triggerGSAP={renderCompleted} activeSection={activeSection} />
      <Stack
        display={"block"}
        h={"100vh"}
        w={"100vw"}
        style={{
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {renderCompleted && (
          <>
            {Object.entries(sectionsRef).map(([key, ref]) => (
              <div key={key} ref={ref} data-section={key}>
                {key === "home" && <PageHero triggerGSAP={activeSection === "home"} />}
                {key === "carreira" && <PageCareers triggerGSAP={activeSection === "carreira"} />}
                {key === "habilidades" && <PageSkills triggerGSAP={activeSection === "habilidades"} />}
                {key === "recomendações" && <PageFeedbacks triggerGSAP={activeSection === "recomendações"} />}
                {key === "duvidas" && <PageFaq triggerGSAP={activeSection === "duvidas"} />}
                {key === "contato" && <PageContact triggerGSAP={activeSection === "contato"} />}
              </div>
            ))}
          </>
        )}
      </Stack>
    </Stack>
  );
}
