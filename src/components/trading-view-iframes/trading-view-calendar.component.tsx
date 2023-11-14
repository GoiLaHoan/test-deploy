import Table from "~/src/components/Table/Table";
import { FC } from "react";

// import styles from './TradingViewCalendar.module.scss'

export const TradingViewCalendar: FC = () => {
  return (
    <Table title="Economic Calendar">
      <div className="h-[530px]">
        <iframe
          scrolling="no"
          frameBorder="no"
          src={`https://s.tradingview.com/embed-widget/events/?#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22600%22%2C%22importanceFilter%22%3A%220%2C1%22%2C%22currencyFilter%22%3A%22EUR%2CUSD%2CGBP%2CCAD%22%2C%22whitelabel%22%3Atrue%2C%22utm_source%22%3A%22www.kitco.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22events%22%7D`}
          style={{
            boxSizing: "border-box",
            height: "calc(100% - 32px)",
            width: "100%",
          }}
        ></iframe>
      </div>
    </Table>
  );
};
