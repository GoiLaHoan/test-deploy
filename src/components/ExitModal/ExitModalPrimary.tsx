import React, { FC, useState } from "react";
import styles from "./ExitModal.module.scss";

interface Props {
  title: string;
  titleColor: string;
  subTitle: string;
  subTitleColor: string;
  backgroundImage: string;
  closeModal: (e) => void;
  getResponseCall: (campaigns) => void;
  setUserEmail: (email) => void;
  loading: boolean;
  error: boolean;
}

const ExitModalPrimary: FC<Props> = ({
  title,
  titleColor,
  subTitle,
  subTitleColor,
  backgroundImage,
  closeModal,
  getResponseCall,
  setUserEmail,
  loading,
  error,
}) => {
  const primaryCampaignID = ["N"];
  const [email, setEmail] = useState();
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };
  const titleStyle = {
    color: titleColor,
  };
  const subTitleStyle = {
    color: subTitleColor,
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserEmail(email);
    getResponseCall(primaryCampaignID);
  };

  return (
    <aside className={styles.exitModaOverlayl} onClick={closeModal}>
      <div id="exit-modal" className={styles.exitModal}>
        <div className={styles.container} style={backgroundImageStyle}>
          <img
            id="exit-modal-close-btn"
            className={styles.closeButtonImage}
            src="https://storage.googleapis.com/favish_fas/modal/close_white.png"
          />
          <div>
            <h1 className={styles.title} style={titleStyle}>
              {title}
            </h1>
            <h2 className={styles.subTitle} style={subTitleStyle}>
              {subTitle}
            </h2>
            {error && (
              <div className={styles.errorMessage}>
                <div>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  ></i>
                  <span>Something went wrong. Please try again or</span>
                  <a
                    href="https://corp.kitco.com/contact-us.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    contact us
                  </a>
                </div>
              </div>
            )}
            <form
              id="exit-modal__form"
              onSubmit={handleSubmit}
              className={styles.form}
            >
              {loading && <div className={styles.loader}></div>}
              <input
                id="exit-modal__form-email"
                className={styles.inputEmail}
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
              />
              <input
                id="exit-modal__form-submit"
                className={styles.formSubmitButton}
                type="submit"
                value="Subscribe"
              />
              <div className={styles.formError}>Please enter a valid email</div>
            </form>
            <div className={styles.footer}>
              You can withdraw your consent for any of the above communications
              at any time.
              <a
                href="https://online.kitco.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Privacy policy
              </a>{" "}
              |
              <a
                href="https://corp.kitco.com/contact-us.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ExitModalPrimary;
