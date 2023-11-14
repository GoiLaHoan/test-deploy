import React, { FC, useEffect } from "react";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";

import { JewelryResourcesTitle } from "~/src/components/JewelryTitle/JewelryTitle.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import cs from "~/src/utils/cs";
import styles from "./jeweler-resources.module.scss";

const JewelerResources = () => {
  return (
    <LayoutJewelers title={"Jeweler Resources"}>
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <JewelryResourcesTitle />
      </div>
      <MainJewelerResources />
      <div className="py-[25px] lg:py-[43px] bg-[#EEEEEE]">
        <AdvertisingSlot
          id={`banner-1`}
          className={cs([
            "h-[250px] w-[300px] md:h-[90px] md:w-[728px] lg:h-[250px] lg:w-[970px]",
            "bg-red-400 mx-auto",
          ])}
          viewportsEnabled={{
            mobile: true,
            tablet: false,
            desktop: false,
          }}
        />
      </div>
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1024px] mb-[120px]">
        <ScrapItAndMetalynx />
      </div>
    </LayoutJewelers>
  );
};

export default JewelerResources;

const MainJewelerResources = (): JSX.Element => {
  return (
    <>
      <div className={styles.container}>
        <main className="bg-[#eeeeee] overflow-y-scroll lg:overflow-y-hidden scrollbar-hide">
          <ScrapitIframe />
        </main>
      </div>
    </>
  );
};

const ScrapItAndMetalynx = (): JSX.Element => {
  return (
    <>
      <div className="pt-5 md:pt-10 flex gap-6">
        <div className={cs(["w-7/12", styles.download])}>
          <div className="flex mt-[15px] mb-[60px]">
            <div className="mt-2 w-[50px] md:w-auto">
              <img src="/jewelers/icons/scrapit.svg" />
            </div>
            <div className="ml-[20px] w-[calc(100%_-_70px)] md:w-auto">
              <h1
                className="text-[15px] md:text-[26px] text-[#f07802] font-semibold"
                style={{ fontFamily: "Arial, Verdana, san-serif" }}
              >
                Download our ScrapIt! app today
              </h1>
              <h2 className="text-[18px]">
                <strong>Calculate gold scrap value your way.</strong>
                <br />
                Real-time scrap gold calculator app for professionals.
              </h2>
              <p className="flex mt-2">
                <a
                  href="https://itunes.apple.com/us/app/scrapit!/id921590083"
                  title="Download ScrapIt! on AppStore"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/jewelers/icons/app_store.svg"
                    alt="ScrapIt on AppStore"
                    className="w-[118px] h-[35px] pr-[13px]"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kitco.scrap&hl=en"
                  title="Download ScrapIt! on GooglePlay"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/jewelers/icons/ggplay_store.svg"
                    alt="Download ScrapIt! on GooglePlay"
                    className="w-[118px] h-[35px]"
                  />
                </a>
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mt-2 w-[50px] md:w-auto">
              <img src="/jewelers/icons/metalynx.svg" />
            </div>
            <div className="ml-[20px] w-[calc(100%_-_70px)] md:w-[calc(100%_-_97px)]">
              <h1
                className="text-[15px] md:text-[26px] text-[#f07802] font-semibold"
                style={{ fontFamily: "Arial, Verdana, san-serif" }}
              >
                Download Kitco&apos;s Metalynx app now
              </h1>
              <h2 className="text-[18px]">
                <strong>Plan. Measure. Create. </strong>
                <br />
                Metalynx, your jewelry-making planner app.
              </h2>
              <p className="mt-2 text-[14px]">
                Metalynx is a free handy app from Kitco Inc. that calculates the
                weight or length of an item after you supply the dimensions. It
                will work for round or square wire, tube, sheet, and half-round
                wire. Our versatile app can even give you the difference in
                weight of any product based on a change in the karat or shape of
                the product.{" "}
              </p>
              <p className="mt-2 text-[14px]">
                Metalynx supports all weight and measurement standards, allowing
                you to work with pennyweights or grams, inches or millimeters.
                Thicknesses can be entered in gauge or millimeters, and
                conversions are done instantly.
              </p>
              <p className="flex mt-2">
                <a
                  href="https://itunes.apple.com/us/app/metalynx/id613591018?mt=8"
                  title="Download Kitco's Metalynx app on AppStore"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/jewelers/icons/app_store.svg"
                    alt="Metalynx on AppStore"
                    className="w-[118px] h-[35px] pr-[13px]"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kitco.metalynx"
                  title="Download Metalynx app on GooglePlay"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/jewelers/icons/ggplay_store.svg"
                    alt="Download Metalynx on GooglePlay"
                    className="w-[118px] h-[35px]"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={cs(["w-5/12 self-center", styles.phone])}>
          <img
            src="/jewelers/devices/ScrapIt-Metalynx-mobile-apps.jpg"
            title="ScrapIt!"
          />
        </div>
      </div>
    </>
  );
};

const ScrapitIframe: FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>();

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleIframeLoad = () => {
      const style = document.createElement("style");
      style.textContent = `body { overflow-x: hidden } 
                          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } 
                          .scrollbar-hide::-webkit-scrollbar { display: none; }`;
      iframe.contentDocument.head.appendChild(style);
      iframe.contentDocument.body.classList.add("scrollbar-hide");
    };

    iframe.addEventListener("load", handleIframeLoad);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
    };
  }, []);

  return (
    <iframe
      src="/iframe/scrapit/index.html"
      className={styles.iframe}
      frameBorder="0"
      ref={iframeRef}
    />
  );
};
