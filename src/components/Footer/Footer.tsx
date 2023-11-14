import clsx from "clsx";
import { useRouter } from "next/router";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import Icon from "../Icon/Icon";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.scss";

const SocialContainer = () => {
  const iconProps = {
    color: "white",
    margin: "0 10px 0 0",
    size: "24px",
  };
  return (
    <div className={styles.socialContainer}>
      <Icon icon="facebook" fill={true} strokeWidth="0" {...iconProps} />
      <Icon icon="twitterx" fill={true} strokeWidth="0" {...iconProps} />
      <Icon icon="linkedin" fill={true} strokeWidth="0" {...iconProps} />
      <Icon icon="instagram" fill={false} {...iconProps} />
      <Icon
        icon="youtube"
        color="white"
        fill={false}
        strokeWidth="2px"
        size="24px"
      />
    </div>
  );
};

const Footer = () => {
  const r = useRouter();

  return (
    <footer
      className={clsx(
        styles.footer,
        r.pathname.includes("/news/video")
          ? styles.videoPageBG
          : styles.defaultBG,
      )}
    >
      <div className={`${styles.logoSocial} ml-6 md:block md:mb-6`}>
        <Logo />
        <SocialContainer />
      </div>
      <div className={styles.gridContent}>
        <div className="hidden lg:block">
          <Logo />
          <SocialContainer />
        </div>
        <div className={styles.displayColumn}>
          <h3 className={styles.columnTitle}>TOOLS</h3>
          <a href="/">Kitco Gold Index</a>
          <a href="/">Interactive Gold</a>
          <a href="/">Bitcon in USD</a>
          <a href="/">Currency Converter</a>
          <a href="/">ScrapIt!</a>
          <a href="/">Site Map</a>
        </div>
        <div className={styles.displayColumn}>
          <h3 className={styles.columnTitle}>COMPANY</h3>
          <a href="/">About</a>
          <a href="/">Kitco Media</a>
          <a href="/">Careers</a>
          <a href="/">Contact</a>
          <a href="/">Advertise with us</a>
        </div>
        <div className={styles.displayColumn}>
          <h3 className={styles.columnTitle}>APPS</h3>
          <a href="/">iOS</a>
          <a href="/">Android</a>
        </div>
        <FeedbackForm />
      </div>
      <div className={styles.legalFlexWrapper}>
        <div className={styles.legalContainer}>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/">Terms &amp; Conditions</a>
          <a href="/">Privacy Policy</a>
        </div>
        <p className={styles.incText}>&#169; Kitco Metals Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
