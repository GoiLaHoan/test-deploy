import styles from "./ServicesList.module.scss";
import cs from "~/src/utils/cs";
import {
  IoChevronUpOutline,
  IoChevronDownSharp,
  IoCheckmark,
} from "react-icons/io5";
import {
  ServicesType,
  ServicesKeys,
  ShowMoreKeys,
  SERVICE_STATUS,
} from "~/src/utils/useSubscriptions";

interface Props {
  services: ServicesType;
  showContent: any;
  toggleShowMore: (...args: any[]) => void;
  toggle: (...args: any[]) => void;
  handleRedirect: (...args: any[]) => void;
}

const ListServices = ({
  services,
  showContent,
  toggleShowMore,
  toggle,
  handleRedirect,
}: Props) => {
  const isSelect = (key: ServicesKeys) => {
    if (services[key] == SERVICE_STATUS.select) return true;
    return false;
  };

  const isShowMore = (key: ShowMoreKeys) => {
    return showContent[key];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 mx-5 md:mx-0">
      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Daily</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img src="/services/email-offers.png" alt="Special Offer" />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("special_offer")}
            >
              {isShowMore("special_offer") && <IoChevronUpOutline size={18} />}
              {!isShowMore("special_offer") && <IoChevronDownSharp size={18} />}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("special_offer") && styles.active,
            ])}
          >
            <h2>Special Offer</h2>
            <p className="font-normal">
              Don&apos;t miss out on exclusive offers, new products and buying
              opportunities, as well as curated content from Kitco and select
              partners.
            </p>
          </div>
        </div>
        {services.special_offer == SERVICE_STATUS.selected ? (
          <div className={cs([styles.serviceButton, styles.selected])}>
            <IoCheckmark className="inline-block mr-1" size={20} />
            SIGNED UP
          </div>
        ) : (
          <div
            onClick={() => toggle("special_offer")}
            className={cs([
              styles.serviceButton,
              isSelect("special_offer") && styles.active,
            ])}
          >
            {isSelect("special_offer") && (
              <IoCheckmark className="inline-block mr-1" size={20} />
            )}
            {isSelect("special_offer") ? "SELECTED" : "SELECT"}
          </div>
        )}
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Daily</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img src="/services/daily-recap.png" alt="Daily Recap" />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("daily_recap")}
            >
              {isShowMore("daily_recap") && <IoChevronUpOutline size={18} />}
              {!isShowMore("daily_recap") && <IoChevronDownSharp size={18} />}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("daily_recap") && styles.active,
            ])}
          >
            <h2>Daily Recap</h2>
            <p className="text-xs font-normal">
              Stay up-to-date with a daily rundown of the top headlines shaping
              precious metals, digital assets, and financial markets every day.
            </p>
          </div>
        </div>
        {services.daily_recap == SERVICE_STATUS.selected ? (
          <div className={cs([styles.serviceButton, styles.selected])}>
            <IoCheckmark className="inline-block mr-1" size={20} />
            SIGNED UP
          </div>
        ) : (
          <div
            onClick={() => toggle("daily_recap")}
            className={cs([
              styles.serviceButton,
              isSelect("daily_recap") && styles.active,
            ])}
          >
            {isSelect("daily_recap") && (
              <IoCheckmark className="inline-block mr-1" size={20} />
            )}
            {isSelect("daily_recap") ? "SELECTED" : "SELECT"}
          </div>
        )}
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Weekly</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img src="/services/front_burner.png" alt="Markets Front Burner" />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("front_burner")}
            >
              {isShowMore("front_burner") && <IoChevronUpOutline size={18} />}
              {!isShowMore("front_burner") && <IoChevronDownSharp size={18} />}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("front_burner") && styles.active,
            ])}
          >
            <h2>Markets Front Burner</h2>
            <p className="text-xs font-normal">
              A must-read weekly report on the major hot topics that are
              presently impacting the markets
            </p>
          </div>
        </div>
        {services.front_burner == SERVICE_STATUS.selected ? (
          <div className={cs([styles.serviceButton, styles.selected])}>
            <IoCheckmark className="inline-block mr-1" size={20} />
            SIGNED UP
          </div>
        ) : (
          <div
            onClick={() => toggle("front_burner")}
            className={cs([
              styles.serviceButton,
              isSelect("front_burner") && styles.active,
            ])}
          >
            {isSelect("front_burner") && (
              <IoCheckmark className="inline-block mr-1" size={20} />
            )}
            {isSelect("front_burner") ? "SELECTED" : "SELECT"}
          </div>
        )}
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Weekdays</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img
              src="/services/trade-signals.png"
              alt="CPM Group Trade Signals"
            />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("trade_signals")}
            >
              {isShowMore("trade_signals") && <IoChevronUpOutline size={18} />}
              {!isShowMore("trade_signals") && <IoChevronDownSharp size={18} />}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("trade_signals") && styles.active,
            ])}
          >
            <h2>CPM Group Trade Signals</h2>
            <p className="text-xs font-normal">
              Receive trade signals released by CPM Group, as a result of the
              collective efforts of the CPM&apos;s staff that reflect the
              collective view of market conditions and trends.
            </p>
          </div>
        </div>
        <div
          className={styles.serviceButton}
          onClick={() => handleRedirect("/services/cpm-group-signals")}
        >
          SIGN UP HERE
        </div>
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Weekly</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img
              src="/services/the-weekly-rundown.png"
              alt="The Weekly Rundown"
            />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("weekly_rundown")}
            >
              {isShowMore("weekly_rundown") && <IoChevronUpOutline size={18} />}
              {!isShowMore("weekly_rundown") && (
                <IoChevronDownSharp size={18} />
              )}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("weekly_rundown") && styles.active,
            ])}
          >
            <h2>The Weekly Rundown</h2>
            <p className="text-xs font-normal">
              Hand-picked content from our news team summarizing the week that
              was, sent out every Friday. Stay on top of what moved the markets
              every week.
            </p>
          </div>
        </div>
        {services.weekly_rundown == SERVICE_STATUS.selected ? (
          <div className={cs([styles.serviceButton, styles.selected])}>
            <IoCheckmark className="inline-block mr-1" size={20} />
            SIGNED UP
          </div>
        ) : (
          <div
            onClick={() => toggle("weekly_rundown")}
            className={cs([
              styles.serviceButton,
              isSelect("weekly_rundown") && styles.active,
            ])}
          >
            {isSelect("weekly_rundown") && (
              <IoCheckmark className="inline-block mr-1" size={20} />
            )}
            {isSelect("weekly_rundown") ? "SELECTED" : "SELECT"}
          </div>
        )}
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img src="/services/alerts.png" alt="Kitco Real-Time Alerts" />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("real_time_alerts")}
            >
              {isShowMore("real_time_alerts") && (
                <IoChevronUpOutline size={18} />
              )}
              {!isShowMore("real_time_alerts") && (
                <IoChevronDownSharp size={18} />
              )}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("real_time_alerts") && styles.active,
            ])}
          >
            <h2>Kitco Real-Time Alerts</h2>
            <p className="text-xs font-normal">
              Don&apos;t miss a rally, don&apos;t miss a dip. 24/7 real-time
              breaking news and price moves.
              <br />
              Make timely decisions through tailored alerts sent directly to
              your device or inbox.
            </p>
          </div>
        </div>
        <div
          className={styles.serviceButton}
          onClick={() =>
            handleRedirect("http://alerts.kitco.com/KcastAlertsWeb/")
          }
        >
          SETUP MY ALARMS
        </div>
      </div>

      <div className={styles.serviceItem}>
        <div className={styles.body}>
          <span className={styles.label}>Weekly</span>
          <div className="flex items-center justify-between my-3 md:h-[85px]">
            <img
              src="/services/master-trader-weekly.png"
              alt="Master Trader Weekly"
            />
            <div
              className="buttonMore block md:hidden ml-5 md:ml-0"
              onClick={() => toggleShowMore("trader_weekly")}
            >
              {isShowMore("trader_weekly") && <IoChevronUpOutline size={18} />}
              {!isShowMore("trader_weekly") && <IoChevronDownSharp size={18} />}
            </div>
          </div>
          <div
            className={cs([
              styles.contentText,
              isShowMore("trader_weekly") && styles.active,
            ])}
          >
            <h2>Master Trader Weekly</h2>
            <p className="text-xs font-normal">
              Free market updates and trading insights on Stocks, Crypto,
              Commodities, and Forex, from
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.verifiedinvestingeducation.com/home"
              >
                Verified Investing.
              </a>
            </p>
          </div>
        </div>
        <div
          className={styles.serviceButton}
          onClick={() =>
            handleRedirect("https://www.verifiedinvestingeducation.com/home")
          }
        >
          SIGN UP HERE
        </div>
      </div>
    </div>
  );
};

export default ListServices;
