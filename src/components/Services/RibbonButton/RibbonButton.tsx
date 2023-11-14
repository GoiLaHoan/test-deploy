import styles from "./RibbonButton.module.scss";
import {
  IoChevronUpOutline,
  IoChevronDownSharp,
  IoCloseOutline,
} from "react-icons/io5";

interface Props {
  message: any;
  showLessForm: boolean;
  handleCloseNotify: (event: React.MouseEvent<HTMLElement>) => void;
  handleLessForm: (event: React.MouseEvent<HTMLElement>) => void;
}

const RibbonButton = ({
  message,
  showLessForm,
  handleCloseNotify,
  handleLessForm,
}: Props) => {
  if (message && message.isSuccess)
    return (
      <div className={styles.buttonAction} onClick={handleCloseNotify}>
        <IoCloseOutline size={18} />
      </div>
    );

  return (
    <div className={styles.buttonAction} onClick={handleLessForm}>
      {showLessForm && <IoChevronUpOutline size={18} />}
      {!showLessForm && <IoChevronDownSharp size={18} />}
    </div>
  );
};

export default RibbonButton;
