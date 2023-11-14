import { useEffect, useState } from "react";

export const CHANNELS = {
  special_offer: 5,
  daily_recap: 23,
  weekly_rundown: 4,
  front_burner: 25,
};

export const SERVICE_STATUS = {
  select: "SELECT",
  selected: "SELECTED",
  none_select: "NONE_SELECT",
};
const SERVICES = {
  special_offer: SERVICE_STATUS.none_select,
  daily_recap: SERVICE_STATUS.none_select,
  weekly_rundown: SERVICE_STATUS.none_select,
  front_burner: SERVICE_STATUS.none_select,
};

export type ServicesType = typeof SERVICES;
export type ServicesKeys = keyof ServicesType;

// const subscriptions = {
//   special_offer: false,
//   daily_recap: false,
//   weekly_rundown: false,
//   front_burner: false,
// }
const showMore = {
  special_offer: false,
  daily_recap: false,
  weekly_rundown: false,
  trade_signals: false,
  real_time_alerts: false,
  trader_weekly: false,
  front_burner: false,
};

export type ShowMore = typeof showMore;
export type ShowMoreKeys = keyof ShowMore;

export default function useSubscriptions() {
  const [showContent, setShowContent] = useState<ShowMore>(showMore);
  const [services, setServices] = useState<ServicesType>(SERVICES);

  useEffect(() => {
    const kitcoChannels = localStorage.getItem("KITCO_CHANNELS");
    if (kitcoChannels) return setServices(JSON.parse(kitcoChannels));

    return localStorage.setItem("KITCO_CHANNELS", JSON.stringify(services));
  }, []);

  const isChooseAll = () => {
    for (const key in services) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        services.hasOwnProperty(key) &&
        services[key] === SERVICE_STATUS.none_select
      ) {
        return false;
      }
    }
    return true;
  };

  const isExistCheckbox = () => {
    for (const key in services) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        services.hasOwnProperty(key) &&
        services[key] === SERVICE_STATUS.select
      ) {
        return true;
      }
    }
    return false;
  };

  const closeNotify = () => {
    Object.keys(services).forEach((key: ServicesKeys) => {
      if (services[key] == SERVICE_STATUS.select) {
        setServices((prev) => ({
          ...prev,
          [key]: SERVICE_STATUS.none_select,
        }));
      }
    });
  };

  function toggle(key: ServicesKeys): void {
    const status =
      services[key] == SERVICE_STATUS.select
        ? SERVICE_STATUS.none_select
        : SERVICE_STATUS.select;
    setServices((prev) => ({
      ...prev,
      [key]: status,
    }));
  }

  function toggleAll(): void {
    if (isChooseAll()) {
      console.log(1);
      Object.keys(services).forEach((key: ServicesKeys) => {
        if (services[key] == SERVICE_STATUS.select) {
          setServices((prev) => ({
            ...prev,
            [key]: SERVICE_STATUS.none_select,
          }));
        }
      });
    }

    if (!isChooseAll()) {
      console.log(2);
      Object.keys(services).forEach((key: ServicesKeys) => {
        if (services[key] == SERVICE_STATUS.none_select) {
          setServices((prev) => ({
            ...prev,
            [key]: SERVICE_STATUS.select,
          }));
        }
      });
    }
  }

  function toggleShowMore(key: ShowMoreKeys): void {
    setShowContent((prev) => ({
      ...prev,
      [key]: !showContent[key],
    }));
  }

  return {
    services,
    setServices,
    isChooseAll,
    toggle,
    toggleAll,
    isExistCheckbox,
    showContent,
    toggleShowMore,
    closeNotify,
  };
}
