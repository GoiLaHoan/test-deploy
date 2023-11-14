import React, { FC, useState } from "react";
import styles from "./ExitModal.module.scss";

interface Props {
  closeModal: (e) => void;
  getResponseCall: (campaigns) => void;
  loading: boolean;
}

const ExitModalSecondary: FC<Props> = ({
  closeModal,
  getResponseCall,
  loading,
}) => {
  const [error, setError] = useState(false);
  const [dealsChecked, setDealsChecked] = useState(false);
  const [weeklyChecked, setWeeklyChecked] = useState(false);
  const dealsCampaignID = "s";
  const weeklyRundownCampaignID = "2";
  const backgroundColor = {
    background: "#CCDEEC",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dealsChecked && !weeklyChecked) {
      setError(true);
    } else {
      getResponseCall([dealsCampaignID, weeklyRundownCampaignID]);
    }
  };
  const handleChange = (e) => {
    if (e.target.id === "deals") {
      if (e.target.checked) {
        setDealsChecked(true);
        setError(false);
      } else {
        setDealsChecked(false);
      }
    } else if (e.target.id === "weekly") {
      if (e.target.checked) {
        setWeeklyChecked(true);
        setError(false);
      } else {
        setWeeklyChecked(false);
      }
    }
  };

  return (
    <aside className={styles.exitModaOverlayl} onClick={closeModal}>
      <div id="exit-modal" className={styles.exitModal}>
        <div className={styles.container} style={backgroundColor}>
          <img
            id="exit-modal-close-btn"
            className={styles.closeButtonImage}
            src="https://storage.googleapis.com/favish_fas/modal/close_white.png"
          />
          <h2 className={styles.successMessageSecondary}>
            Thank you for subscribing!
          </h2>
          <h1 className={styles.titleSecondary}>Want More from Kitco?</h1>
          <form
            id="exit-modal__form-secondary"
            onSubmit={handleSubmit}
            className={styles.formSecondary}
          >
            <div className={styles.formContainerSecondary}>
              {loading && (
                <div
                  className={[styles.loader, styles.loaderSecondary].join(" ")}
                ></div>
              )}
              <label htmlFor="deals" className={styles.formLabel}>
                Deals In Your Inbox
                <input
                  type="checkbox"
                  id="deals"
                  className={styles.formCheckbox}
                  name="deals"
                  value="deals"
                  onChange={handleChange}
                />
              </label>
              <ul className={styles.list}>
                <li className={styles.listItem}>Exclusive offers</li>
                <li className={styles.listItem}>
                  Free curated content & promotions from Kitco <br /> and
                  carefully selected Kitco partners
                </li>
              </ul>
            </div>
            <div className={styles.formContainerSecondary}>
              <label htmlFor="weekly" className={styles.formLabel}>
                The Weekly Rundown
                <input
                  type="checkbox"
                  id="weekly"
                  className={styles.formCheckbox}
                  name="weekly"
                  value="weekly"
                  onChange={handleChange}
                />
              </label>
              <ul className={styles.list}>
                <li className={styles.listItem}>Delivered every Friday</li>
                <li className={styles.listItem}>
                  Hand-picked content from our news team
                </li>
              </ul>
            </div>
            <input
              className={styles.submitSecondary}
              type="submit"
              value="Add to my subscription "
            />
            <div
              id="decline-button"
              className={styles.declineButton}
              onClick={closeModal}
            >
              No, thank you
            </div>
            {error && (
              <div className={styles.error}>
                Please select at least one checkbox
              </div>
            )}
          </form>
          <div className={styles.footerSecondary}>
            You can withdraw your consent for any of the above communications at
            any time.
            <a
              href="https://online.kitco.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Privacy policy
            </a>
            <span className={styles.divider}>|</span>
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
    </aside>
  );
};

export default ExitModalSecondary;
