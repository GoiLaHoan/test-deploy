import cs from "~/src/utils/cs";
import styles from "./ServicesHead.module.scss";
import { BsCheck2Square, BsSquare } from "react-icons/bs";

interface Props {
  isChooseAll: boolean;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
}

const ServicesHead = ({ isChooseAll, toggle }: Props) => {
  return (
    <>
      <h1
        className={cs([
          "uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px] text-kitco-black",
          styles.title,
        ])}
      >
        SUBSCRIBE NOW TO EXCLUSIVE NEWSLETTERS
      </h1>
      <div className="flex items-center justify-between mb-10 gap-3">
        <p className={cs([styles.subTitle, "text-kitco-black"])}>
          Market alerts, expert analysis, & hand-picked content delivered
          straight to your inbox
        </p>
        <div className="hidden md:flex items-center justify-between">
          <span className={cs([styles.subscribeAll, "mr-2"])}>
            SUBSCRIBE ALL
          </span>
          <div onClick={toggle} className="flex my-2 cursor-pointer">
            <div className="">
              {!isChooseAll && <BsSquare size={26} color="#707070" />}
              {isChooseAll && <BsCheck2Square size={26} color="#707070" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesHead;
