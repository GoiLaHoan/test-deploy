import cs from "~/src/utils/cs";
import styles from "./PrivacyText.module.scss";

const PrivacyText = () => {
  return (
    <div className={cs([styles.note, "text-center"])}>
      <p>
        You can withdraw your consent for any of the above communications at any
        time. <br className="lg:hidden" />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://online.kitco.com/legal/privacy-policy"
        >
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://corp.kitco.com/contact-us.html#lhs_container"
        >
          Contact Us
        </a>
      </p>
    </div>
  );
};

export default PrivacyText;
