import { FC } from "react";
import Icon from "./../Icon/Icon";

import styles from "./Socials.module.scss";

interface Props {
  email: string | null;
  facebook: string | null;
  linkedIn: string | null;
  twitter: string | null;
  authorWebsite?: string | null;
}

export const Socials: FC<Props> = ({
  email,
  facebook,
  linkedIn,
  twitter,
  authorWebsite,
}) => {
  const iconProps = {
    strokeWidth: "0",
    color: "#333",
    size: "18px",
  };

  return (
    <ul className={styles.shareItemsContainer}>
      {facebook && (
        <li className={styles.shareItem}>
          <a href={facebook} target="_blank" rel="noreferrer">
            <Icon
              icon="facebook"
              fill={true}
              margin="0 2px 0 0"
              {...iconProps}
            />
          </a>
        </li>
      )}
      {twitter && (
        <li className={styles.shareItem}>
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              icon="twitter"
              fill={true}
              margin="2px 0 0 2px"
              {...iconProps}
            />
          </a>
        </li>
      )}
      {linkedIn && (
        <li className={styles.shareItem}>
          <a
            href={`https://www.linkedin.com/${linkedIn}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              icon="linkedin"
              fill={true}
              margin="2px 0 0 2px"
              {...iconProps}
            />
          </a>
        </li>
      )}
      {authorWebsite && (
        <li className={styles.shareItem}>
          <a href={authorWebsite} target="_blank" rel="noopener noreferrer">
            <img
              src="/icons/mdi_earth.svg"
              alt="Mdi Earth Logo"
              height={20}
              width={20}
            />
          </a>
        </li>
      )}
      {email && (
        <li className={styles.shareItem}>
          <a href={`mailto:${email}`}>
            <Icon icon="mail" fill={false} strokeWidth="2px" size="18px" />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Socials;
