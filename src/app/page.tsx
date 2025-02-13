"use client";
import Background from "@/components/_ui/background/background";
import { Stack } from "@mantine/core";
import { useState } from "react";
import Loading from "@/components/_ui/loading/loading";
import LeftNavigation from "@/components/_ui/navigationBar/leftNavigation";
import RightNavigation from "@/components/_ui/navigationBar/rightNavigation";
import themeDevices from "@/styles/themeDevices";
import PageSkills from "@/components/pages/skills/pageSkills";
import PageCareers from "@/components/pages/careers/pageCareers";
import PageHero from "@/components/pages/hero/pageHero";
import PageContact from "@/components/pages/contact/pageContact";
import CustomAffix from "@/components/_ui/affix/customAffix";

export default function Home() {
  const { isMobile } = themeDevices();
  const [renderCompleted, setRenderCompleted] = useState(false);

  return (
    <>
      <Stack>
        <Loading onComplete={() => setRenderCompleted(true)} />
        <Background />
        <LeftNavigation triggerGSAP={renderCompleted} />
        <RightNavigation triggerGSAP={renderCompleted} />
        <Stack display={"block"} className="main" h={renderCompleted ? "max-content" : "100vh"} style={{
          backdropFilter: isMobile ? "blur(10px)" : "blur(16px)",
          backgroundImage: 'url(./app.png)',
        }}>
          {renderCompleted && (
            <>
              <PageHero />
              <PageCareers />
              <PageSkills />
              <PageContact />
            </>
          )}
        </Stack>
        <CustomAffix />
      </Stack>
    </>
  );
}
