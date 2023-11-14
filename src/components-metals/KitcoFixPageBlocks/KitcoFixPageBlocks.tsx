import {
  CurrencySelect,
  useCurrencyReadOnlyAtom,
} from "~/src/components/CurrencySelect/CurrencySelect";
import { Socials } from "~/src/components/socials/Socials";
import cs from "~/src/utils/cs";
import dates, { Timezones } from "~/src/utils/dates";

import type { Metal } from "~/src/generated";
import st from "~/src/styles/pages/kitco-fix.module.scss";

import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import {
  useWeightAtomRead,
  WeightSelect,
} from "~/src/components/WeightSelect/WeightSelect.component";

export function TitleBar() {
  return (
    <div className={st.titlebarWrap}>
      <div className={st.iconContainer}>
        <img
          src="/icons/kitco-circle-logo.svg"
          height="35px"
          width="35px"
          alt="Kitco Circle Logo"
        />
      </div>
      <h1 className={st.pageTitle}>
        Kitco Gold and Precious Metals Fix{" "}
        <span className={st.newSpan}>NEW</span>
      </h1>
      <div className={st.socialsContainer}>
        <Socials
          facebook="https://frontend.dev.kitco.com"
          email="https://frontend.dev.kitco.com"
          twitter="https://frontend.dev.kitco.com"
          linkedIn="https://frontend.dev.kitco.com"
        />
      </div>
    </div>
  );
}
export function ZoneSwitcher(props: {
  zone: Timezones;
  zoneHandler: (z: Timezones) => void;
}) {
  const zones: Array<{ short: Timezones; long: string }> = [
    { short: Timezones.NY, long: "New York" },
    { short: Timezones.UK, long: "London" },
    { short: Timezones.IS, long: "Mumbai" },
    { short: Timezones.HK, long: "Hong Kong" },
  ];
  return (
    <div className={st.btnGrid}>
      {zones.map(({ short, long }, idx) => (
        <button
          key={idx}
          className={cs([
            st.defs,
            props.zone !== short ? st.inactive : st.active,
          ])}
          type="button"
          onClick={() => props.zoneHandler(short)}
        >
          {long}
        </button>
      ))}
    </div>
  );
}

export function MainPriceTitle() {
  return <h1 className={st.dateTitle}>{dates.day()}</h1>;
}

export function MainPriceBorder({ children }: { children: React.ReactNode }) {
  return <div className={st.mainPricesBorder}>{children}</div>;
}

export function MainPriceBlock(props: { zone: Timezones }) {
  const currency = useCurrencyReadOnlyAtom();
  const weight = useWeightAtomRead();

  const { data } = useQuery(
    metals.goldSilverPlatinumPalladium({
      variables: {
        timestamp: dates.tenAMunix(props.zone),
        currency: currency.symbol,
      },
    }),
  );
  const loaders = ["gold", "silver", "platinum", "palladium"];
  function uselessInformationProducer(): string {
    switch (props.zone) {
      case Timezones.NY:
        return "NY Time";
      case Timezones.UK:
        return "London Time";
      case Timezones.IS:
        return "Mumbai Time";
      case Timezones.HK:
        return "HK Time";
    }
  }
  return (
    <div className={st.priceBodyWrap}>
      <div className={st.priceGrid}>
        {!data
          ? loaders.map((x) => (
              <div key={x} className={st.item}>
                <h4>{x}</h4>
                <h2>-</h2>
                <p>{dates.day()}</p>
              </div>
            ))
          : Object.entries(data)?.map(([name, metal]: [string, Metal], idx) => (
              <div key={metal.ID + idx} className={st.item}>
                <h4>{name}</h4>
                <h2>{weight.renderFn(metal?.results[0]?.bid)}</h2>
                <span>
                  {dates.clock(props.zone ?? Timezones.NY, metal.ID)}{" "}
                  {uselessInformationProducer()}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

export function ControlBar(props: { zone: Timezones }) {
  function uselessInformationProducer(): string {
    switch (props.zone) {
      case Timezones.NY:
        return "EST (GMT-5)";
      case Timezones.UK:
        return "BST (GMT+1)";
      case Timezones.IS:
        return "IST (GMT+5:30)";
      case Timezones.HK:
        return "HKT (GMT+8)";
    }
  }
  return (
    <div className={st.controlWrap}>
      <h2>Time value in {uselessInformationProducer()}</h2>
      <div className="flex items-center gap-4">
        <CurrencySelect />
        <WeightSelect />
      </div>
    </div>
  );
}
