import Link from "next/link";
import { Icons, SectionItems } from "~/src/types";
import Icon from "../../Icon/Icon";
import KitcoIcon from "../../Icon/KitcoIcon";
import StorageIcon from "../../Icon/StorageIcon";

import styles from "./SectionList.module.scss";

interface Props {
  title: string;
  titleUrl?: string;
  icon?: Icons | "kitco" | "storage";
  iconColor?: string;
  items?: SectionItems[];
}

const SectionList = ({ icon, iconColor, items, title, titleUrl }: Props) => {
  const defaultColor = "#f9c432";
  return (
    <div className={styles.iconTitleContainer}>
      {!icon && <div />}
      {icon === "kitco" && (
        <div className={styles.iconContainer}>
          <KitcoIcon color={!iconColor ? defaultColor : iconColor} />
        </div>
      )}
      {icon === "storage" && (
        <div className={styles.iconContainer}>
          <StorageIcon color={!iconColor ? defaultColor : iconColor} />
        </div>
      )}
      {icon !== "kitco" && icon !== "storage" && icon !== undefined && (
        <div className={styles.iconContainer}>
          <Icon
            icon={icon}
            size="18px"
            color={!iconColor ? defaultColor : iconColor}
          />
        </div>
      )}
      <ul>
        <li>
          {!titleUrl ? (
            <h4 className="font-bold text-white">{title}</h4>
          ) : (
            <Link href={titleUrl}>
              <h4 className="font-bold text-white">{title}</h4>
            </Link>
          )}
        </li>
        {!items && <div />}
        {items?.map((x, idx) => (
          <li key={idx}>
            {!x.as ? (
              <a href={x.href} className={styles.item}>
                {x.name}
              </a>
            ) : (
              <Link className={styles.item} href={x.href} as={x.as}>
                {x.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionList;
