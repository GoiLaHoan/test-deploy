import dayjs from "dayjs";
import { FC } from "react";
import { useQuery } from "react-query";
import { mining } from "~/src/lib/mining.lib";
import cs from "~/src/utils/cs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import Link from "next/link";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import useScreenSize from "~/src/utils/useScreenSize";

import styles from "~/src/styles/pages/PressRelease.module.scss";
import { useInfinite, useParams } from "~/src/utils/infiniteScroll";
import { MiningPressReleaseQuery } from "~/src/generated";
import GlobalMeta from "~/src/components/GlobalMeta/GlobalMeta";
import { GetServerSideProps } from "next";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ItemPropsType {
  id: string | number;
  url: string;
  title: string;
  updatedAt: string;
}

export const getServerSideProps: GetServerSideProps = async (c) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      mining.nodeListPressRelease({ variables: { limit: 40, offset: 0 } }),
    ],
  });
  return {
    props: { dehydratedState },
  };
};

const PressReleases: FC = () => {
  const { params, incrementParams } = useParams(40, 40);

  const { data } = useQuery(
    mining.nodeListPressRelease({
      variables: { ...params },
      options: { enabled: true },
    }),
  );

  return (
    <LayoutNewsLanding title="Mining Press Releases | KITCO Mining">
      <GlobalMeta
        title="Mining Press Releases | KITCO Mining"
        description="Latest Press Releases form the Mining Industry."
        keywords="KITCO Mining, Press Releases, Canadian Resource Stocks, Mining Stocks, Junior Mining Stocks, Mining Equipment, Mining Markets, Dividends, Uranium, Nuclear Energy, Mine Development, Mining Picks"
        type="press-releases"
      />
      <div className="px-[20px] mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <TitlePressRelease />
        <div className="grid gap-8 lg:grid-cols-layout-1 px-0 sm:grid-cols-1">
          <div>
            <hr className="text-[#bfbfbf] mt-[5px]" />
            <div className="flex gap-8 pt-5 pb-[30px]">
              <DataTableReleases
                data={data}
                incrementParams={incrementParams}
              />
              <AdsOnDesktop />
            </div>
          </div>
        </div>
      </div>
    </LayoutNewsLanding>
  );
};

const TitlePressRelease: FC = () => {
  const baseH1 = "uppercase text-[26px] md:text-[48px] text-ktc-date-gray";
  const baseSubH1 =
    "uppercase text-[26px] md:leading-[58px] leading-[38px] md:text-[48px]";

  const handleLink = "/news/category/mining";

  return (
    <h1 className="flex justify-between items-center">
      <div className="flex items-center leading-[38px] md:leading-[58px]">
        <Link href={handleLink}>
          <h1 className={cs([baseH1])}>{"Mining"}</h1>
        </Link>

        <h1 className={cs([baseH1, "px-1 md:px-2"])}>/</h1>
        <h1 className={cs([baseSubH1, "text-kitco-black"])}>
          latest mining press releases
        </h1>
      </div>
    </h1>
  );
};

const DataTableReleases: FC<{
  data: MiningPressReleaseQuery;
  incrementParams: () => void;
}> = ({ data, incrementParams }) => {
  const { items, fetchMore, isNextPage } = useInfinite({
    items: data?.nodeList?.items,
    incrementParams,
    total: data?.nodeList?.total,
  });

  const dateRelease = (date: string): string => {
    const dateStr = dayjs(date)
      .tz("America/New_York")
      .format("MMM DD, YYYY h:mm A");

    return dateStr;
  };

  const ShowDataReleases = ({ items }): JSX.Element => {
    if (!items) return null;

    return items.map((x: ItemPropsType) => (
      <tr key={x.id} className="border border-gray-300">
        <td className="py-1 px-4 grid grid-cols-none md:grid-cols-[70%,auto] justify-between items-center">
          <a href={x.url} className="grow w-full">
            <h5
              className={cs([
                "text-sm !font-semibold text-gray-800",
                styles.title,
              ])}
            >
              {x.title}
            </h5>
          </a>
          <time
            dateTime={x.updatedAt}
            className="text-[0.8125rem] !font-normal text-[#757575] md:text-right w-full whitespace-nowrap"
          >
            {dateRelease(x.updatedAt)}
          </time>
        </td>
      </tr>
    ));
  };

  return (
    <section className="w-full">
      <table className="w-full border border-gray-300">
        <tbody>
          <ShowDataReleases items={items} />
        </tbody>
      </table>
      <AdvertisingSlot
        id={`banner-2}`}
        className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-[70px]"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />

      <LoadMoreButton isNextPage={isNextPage} fetchMore={fetchMore} />
    </section>
  );
};

const LoadMoreButton: FC<{ isNextPage: boolean; fetchMore: any }> = ({
  isNextPage,
  fetchMore,
}) => {
  return (
    <div className="text-center">
      <button
        className={cs([
          "rounded-md text-base",
          !isNextPage && "cursor-not-allowed text-ktc-date-gray",
        ])}
        type="button"
        onClick={() => fetchMore()}
      >
        <span className="font-bold text-sm uppercase tracking-normal">
          load more press releases
        </span>
        <div className={styles.chevronDown}>
          <svg
            className={cs([styles.mdsIcon, !isNextPage && styles.iconDisable])}
            id="icon-arrow-down"
            viewBox="0 0 24 24"
          >
            <title>icon-arrow-down</title>
            <polyline points="20.48 7.76 12 16.24 3.52 7.76"></polyline>
          </svg>
          <svg
            className={cs([styles.mdsIcon, !isNextPage && styles.iconDisable])}
            id="icon-arrow-down"
            viewBox="0 0 24 24"
          >
            <title>icon-arrow-down</title>
            <polyline points="20.48 7.76 12 16.24 3.52 7.76"></polyline>
          </svg>
        </div>
      </button>
    </div>
  );
};

const AdsOnDesktop: FC = () => {
  const { isDesktop } = useScreenSize();

  if (!isDesktop) return null;

  return (
    <div className="w-[300px]">
      <AdvertisingSlot
        id={"right-rail-lg"}
        className={"h-[600px] w-[300px] bg-red-400 mx-auto sticky top-4"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </div>
  );
};

export default PressReleases;
