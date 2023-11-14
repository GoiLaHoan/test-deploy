import { FC, useEffect, useRef } from "react";
import cs from "~/src/utils/cs";

export const MiningBanner: FC<{ className?: string }> = ({ className }) => {
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    const iframe = iframeRef.current;

    // Remove class "mining-banner-container" avoid blocked by adblocker
    const handleIframeLoad = () => {
      const iframeMining = iframe.contentDocument.querySelector(
        ".mining-banner-container",
      );
      iframeMining.classList.remove("mining-banner-container");
    };

    iframe.addEventListener("load", handleIframeLoad);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
    };
  }, []);

  return (
    <div
      className={cs([
        "overflow-hidden m-auto w-[731px] h-[190px] relative",
        className,
      ])}
    >
      <iframe
        ref={iframeRef}
        title="mining-banner"
        src="/iframe/collective-mining.html"
        scrolling="no"
        height="100%"
        width="100%"
      />
    </div>
  );
};
