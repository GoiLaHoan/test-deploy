import ExitModalPrimary from "~/src/components/ExitModal/ExitModalPrimary";
import ExitModalSecondary from "~/src/components/ExitModal/ExitModalSecondary";
import { useState } from "react";
import { useQuery } from "react-query";
import { exitModal } from "~/src/lib/exit-modal.lib";

const ExitModalContainer = () => {
  const { data } = useQuery(exitModal.query());
  const [visibility, setVisibility] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState(0);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const subscriptionCookieName = "kc_newsletter";
  const dismissalCookieName = "kc_modal_dismiss";
  const desktopBreakpoint = 1024;
  const closeElements = [
    "exit-modal",
    "exit-modal-close-btn",
    "decline-button",
  ];
  document.addEventListener("mouseout", detectLeaveIntnt);

  function detectLeaveIntnt(event) {
    const from = event.relatedTarget;
    // This will be null if the user is outside the browser window.
    if (!from) {
      setVisibility(true);
      document.removeEventListener("mouseout", detectLeaveIntnt);
    }
  }

  const closeModal = (e) => {
    if (closeElements.includes(e.target.id)) {
      setVisibility(false);
      setEnabled(false);
      setCookie(dismissalCookieName, 1, 14);
    }
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  const isDesktop = () => {
    return window.innerWidth >= desktopBreakpoint;
  };

  // Handles all the cases that can disable the modal.
  const shouldModalShow = () => {
    if (
      data.exitModal.active === "1" && // Check if the modal is active in the system.
      !getCookie(subscriptionCookieName) && // Check to ensure the user has not already subscribed.
      !getCookie(dismissalCookieName) && // Check to ensure the user has not dismissed recently.
      isDesktop() && // Check to ensure we are on desktop
      visibility && // Check to ensure it's not already visible.
      enabled // Check to ensure it's not closed (but during the session it was closed, cookie is only detected on load).
    ) {
      return true;
    } else return false;
  };

  const apiCall = (campaign) => {
    setLoading(true);

    const data = {
      campaign: {
        campaignId: campaign,
      },
      tags: [
        {
          tagId: "J",
        },
      ],
      email: email,
    };

    fetch(
      "https://us-central1-kitco-224816.cloudfunctions.net/GetResponseAPI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        if (response.status === 202 || response.status === 409) {
          setMode(1);
          setLoading(false);
        } else {
          setMode(5);
          console.error("Problem:", response);
          setError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setUserEmail = (userEmail) => {
    setEmail(userEmail);
  };

  const getResponseCall = (campaigns) => {
    campaigns.forEach(function (campaign) {
      apiCall(campaign);
    });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      {data && shouldModalShow() && mode === 0 && (
        <ExitModalPrimary
          title={data.exitModal.title}
          titleColor={data.exitModal.titleColor}
          subTitle={data.exitModal.subTitle}
          subTitleColor={data.exitModal.subTitleColor}
          backgroundImage={data.exitModal.backgroundImage}
          closeModal={closeModal}
          getResponseCall={getResponseCall}
          setUserEmail={setUserEmail}
          loading={loading}
          error={error}
        ></ExitModalPrimary>
      )}
      {data && shouldModalShow() && mode === 1 && (
        <ExitModalSecondary
          closeModal={closeModal}
          getResponseCall={getResponseCall}
          loading={loading}
        ></ExitModalSecondary>
      )}
    </>
  );
};

export default ExitModalContainer;
