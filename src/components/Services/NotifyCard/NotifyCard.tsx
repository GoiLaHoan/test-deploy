import { FC } from "react";
import cs from "~/src/utils/cs";
import { IoCheckmark } from "react-icons/io5";
import styles from "./NotifyCard.module.scss";

const NotifyCard: FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div className={styles.notify}>
      {loading && (
        <span
          className={cs([
            styles.dotsCircleSpinner,
            styles.loading,
            "!hidden lg:!inline-block lg:!mr-12",
          ])}
        ></span>
      )}
      <IoCheckmark
        className="block mx-auto md:inline-block md:mr-1"
        size={32}
      />
      Thank you for <br className="md:hidden" />
      subscribing
      {loading && (
        <span
          className={cs([
            styles.dotsCircleSpinner,
            styles.loading,
            "lg:!hidden",
          ])}
        ></span>
      )}
    </div>
  );
};

export default NotifyCard;
