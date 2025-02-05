"use client";
import Background from "@/components/_ui/background/background";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import Loading from "@/components/_ui/loading/loading";
import useGet from "@/hooks/useGet";
import { API_GIT_URL } from "@/utils/apiGitUrl";
import { User } from "@/types/user";
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

  const { response, sendRequest } = useGet<User>(`${API_GIT_URL}/users/DDR23`);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <Stack>
        <Loading onComplete={() => setRenderCompleted(true)} />
        <Background />
        <LeftNavigation triggerGSAP={renderCompleted} />
        <RightNavigation triggerGSAP={renderCompleted} />
        <Stack display={"block"} className="main" h={renderCompleted ? "max-content" : "100vh"} style={{
          backdropFilter: isMobile ? "blur(64px)" : "blur(86px)",
          backgroundImage: 'url(./noise.png)',
        }}>
          {renderCompleted && (
            <>
              <PageHero user={response?.data} />
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
