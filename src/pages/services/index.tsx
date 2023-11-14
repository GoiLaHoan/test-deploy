import cs from "~/src/utils/cs";
import Head from "next/head";
import { useState } from "react";
import Layout from "~/src/components/Layout/Layout";
import useScreenSize from "~/src/utils/useScreenSize";

import styles from "./Services.module.scss";
import useSubscriptions from "~/src/utils/useSubscriptions";
import NotifyCard from "~/src/components/Services/NotifyCard/NotifyCard";
import RibbonButton from "~/src/components/Services/RibbonButton/RibbonButton";
import ServicesForm from "~/src/components/Services/ServicesForm/ServicesForm";
import ServicesHead from "~/src/components/Services/ServicesHead/ServicesHead";
import ServicesList from "~/src/components/Services/ServicesList/ListServices";

interface IMessage {
  msg: string;
  isSuccess: boolean;
}

const Services = () => {
  const { isMobile } = useScreenSize();
  const {
    services,
    setServices,
    isChooseAll,
    toggle,
    toggleAll,
    isExistCheckbox,
    showContent,
    toggleShowMore,
    closeNotify,
  } = useSubscriptions();

  const [showLessForm, setShowLessForm] = useState(false);
  const [urlRedirect, setUrlRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completeSub, setCompleteSub] = useState(true);
  const [message, setMessage] = useState<IMessage>({
    msg: "",
    isSuccess: false,
  });

  const handleStepComplete = () => setCompleteSub(false);
  const handleCloseNotify = () => {
    closeNotify();
    setMessage({ msg: "", isSuccess: false });
  };
  const handleToggleAll = () => {
    toggleAll();
    setMessage({ msg: "", isSuccess: false });
  };
  const handleRedirect = (path: string) => {
    if (!isExistCheckbox()) return (window.location.href = path);
    setUrlRedirect(path);
    setShowLessForm(false);
  };
  const handleLessForm = () => {
    if (showLessForm) {
      setUrlRedirect(null);
    }
    setShowLessForm(!showLessForm);
  };
  const handleDiscardSelection = () => {
    if (urlRedirect) window.location.href = urlRedirect;
  };

  return (
    <Layout title="Newsletters, Special Offers and Market Alerts | KITCO">
      <Head>
        <meta
          name="description"
          content="KITCO’s newsletters cover a variety of topics, from daily precious metals market news to crypto news. Subscribe to get the latest information right to your inbox."
        />
      </Head>
      <div className={styles.wrapper}>
        <ServicesHead
          isChooseAll={isChooseAll()}
          toggle={() => handleToggleAll()}
        />
        <ServicesList
          services={services}
          showContent={showContent}
          toggleShowMore={toggleShowMore}
          toggle={toggle}
          handleRedirect={handleRedirect}
        />
        <div
          className={cs([
            styles.subscriptions,
            (isExistCheckbox() || message.isSuccess) && styles.active,
            showLessForm && styles.showLess,
            urlRedirect && styles.showLessConfirm,
          ])}
        >
          <RibbonButton
            message={message}
            showLessForm={showLessForm}
            handleCloseNotify={handleCloseNotify}
            handleLessForm={handleLessForm}
          />
          <div
            className={cs([
              styles.form,
              isMobile && urlRedirect && styles.formConfirm,
              isMobile && completeSub && styles.completeSub,
            ])}
          >
            {message.isSuccess && <NotifyCard loading={loading} />}
            {!message.isSuccess && (
              <ServicesForm
                loading={loading}
                services={services}
                setServices={setServices}
                urlRedirect={urlRedirect}
                completeSub={completeSub}
                setLoading={setLoading}
                setMessage={setMessage}
                handleDiscardSelection={handleDiscardSelection}
                handleStepComplete={handleStepComplete}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
