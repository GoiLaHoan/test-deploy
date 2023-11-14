import { type FC, useEffect, useState } from "react";
import { TimestampProvider } from "~/src/utils/ctxTimestamp";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";
import MetalQuoteCell from "~/src/components-metals/MetalQuoteCell/MetalQuoteCell";
import { TeaserTextOnly } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import ChartsMeta from "~/src/components/ChartsMeta/ChartsMeta";
import { ChartsTitle } from "~/src/components/ChartsTitle/ChartsTitle.component";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { allMetals } from "~/src/lib/metals";
import { news } from "~/src/lib/news-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import useScreenSize from "~/src/utils/useScreenSize";
import { titleCase } from "~/src/utils/titleCase";
import { Spacer } from "~/src/components/spacer/spacer.component";

export async function getServerSideProps({ params }) {
  const symbol = allMetals.find((x) => x.name === params.name).symbol;

  return {
    props: {
      name: params.name,
      symbol,
      ssrTimestamp: currentTimestamp(),
    },
  };
}

interface Props {
  name: string;
  symbol: string;
  ssrTimestamp: number;
}

const CommodityPage = ({ name, symbol, ssrTimestamp }: Props) => {
  const { isMobile } = useScreenSize();

  const props = {
    name,
    symbol,
    ssrTimestamp,
  };

  return (
    <LayoutJewelers
      title={`${titleCase(name ?? "Gold")} Price Today | Price of ${titleCase(
        name ?? "Gold",
      )} Per Ounce | 24 Hour Spot Chart | KITCO`}
    >
      <ChartsMeta nameChart={titleCase(name ?? "Gold")} />
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <ChartsTitle />
        {!isMobile && <CommodityDesktopAndTablet {...props} />}
        {isMobile && <CommodityMobile {...props} />}
      </div>
    </LayoutJewelers>
  );
};

export default CommodityPage;

const CommodityMobile = (props: Props) => {
  const { name, symbol, ssrTimestamp } = props;

  const [nameImg, setNameImg] = useState("gold");
  const [isGoldOrSilver, setIsGoldOrSilver] = useState(false);
  const [isCheckImage, setIsCheckImage] = useState(false);

  useEffect(() => {
    const nameMapping = {
      gold: "gold",
      silver: "silver",
      platinum: "plati",
      palladium: "plad",
      rhodium: "rhodium",
    };
    setNameImg(nameMapping[name] || "Gold");
    setIsCheckImage(name === "rhodium" ? false : true);
    setIsGoldOrSilver(name === "gold" || name === "silver");
  }, [name]);

  const getImage = (name: string, symbol: string) => {
    let imageNames = ["0030lns", "0060lns", "0182nys", "0365nys", "1825nys"];

    if (name === "rhodium") {
      imageNames = ["0030lns", "0060lns", "0182lns", "0365lns", "1825lns"];
    }

    if (isGoldOrSilver) {
      imageNames.push("3650nys");
    }

    return imageNames.map((imageName) => (
      <img
        key={imageName}
        src={`https://www.kitco.com/LFgif/${symbol}${imageName}.gif`}
      />
    ));
  };

  return (
    <>
      <div className="">
        {/* Section 1 */}
        <div className="mb-5">
          <h2 className="text-[15px] font-bold text-[#000000] capitalize mb-0.5 font-mulish">
            Live {props.name} Price
          </h2>
          <p className="text-[13px] font-normal text-[#595959]">
            {dayjs().format("MMM DD, YYYY - H:mm") + " NY Time"}
          </p>
        </div>

        {/* Section 2 */}
        <div className="leading-5 border border-[#E5E5E5] rounded-lg px-[15px] pt-[10px] pb-[17px] mb-[30px]">
          <TimestampProvider timestamp={ssrTimestamp}>
            <MetalQuoteCell symbol={symbol} />
          </TimestampProvider>
        </div>

        {/* Section 3 */}
        <div className="mb-[30px]">
          {isCheckImage && (
            <img
              id={`chart_live_${name}`}
              src={`https://www.kitco.com/images/live/${nameImg}.gif`}
              alt={`Live 24hrs ${name} chart`}
            />
          )}
        </div>

        {/* Section 4 */}
        <AdvertisingSlot
          id={`banner-1`}
          className={"h-[250px] w-[300px] bg-red-400 mx-auto mb-[30px]"}
          viewportsEnabled={{
            mobile: true,
            tablet: false,
            desktop: false,
          }}
        />

        {/* Section 5 */}
        <div className="mb-[30px] flex flex-wrap gap-5 justify-center">
          {getImage(name, symbol)}
        </div>

        {/* Section 6 */}
        <AdvertisingSlot
          id={`banner-2`}
          className={"h-[250px] w-[300px] bg-red-400 mx-auto mb-[30px]"}
          viewportsEnabled={{
            mobile: true,
            tablet: false,
            desktop: false,
          }}
        />

        {/* Section 7 */}
        <LatestNewsSection />
      </div>
    </>
  );
};

const CommodityDesktopAndTablet = (props: Props) => {
  return (
    <div className="flex mx-auto w-full max-w-full xl:w-[1240px]">
      <LeftContent {...props} />
      <CommodityContent {...props} />
    </div>
  );
};

const LeftContent = (props: Props) => {
  return (
    <div className="w-[316px]">
      {/* Section 1 */}
      <div className="mb-4 ml-0.5">
        <h2 className="text-[15px] font-bold text-[#000000] capitalize mb-0.5 font-mulish">
          Live {props.name} Price
        </h2>
        <p className="text-[13px] font-normal text-[#595959]">
          {dayjs().format("MMM DD, YYYY - H:mm") + " NY Time"}
        </p>
      </div>

      {/* Section 2 */}
      <div className="leading-5 border border-[#E5E5E5] rounded-lg px-[15px] pt-[10px] pb-[17px] mb-[30px]">
        <TimestampProvider timestamp={props.ssrTimestamp}>
          <MetalQuoteCell symbol={props.symbol} />
        </TimestampProvider>
      </div>

      {/* Section 3 */}
      <AdvertisingSlot
        id={`banner-1`}
        className={"h-[600px] w-[300px] bg-red-400 mx-auto"}
        viewportsEnabled={{
          mobile: false,
          tablet: false,
          desktop: true,
        }}
      />
    </div>
  );
};

const CommodityContent = (props: Props) => {
  const { name, symbol } = props;

  const [nameImg, setNameImg] = useState("gold");
  const [isGoldOrSilver, setIsGoldOrSilver] = useState(true);
  const [isCheckImage, setIsCheckImage] = useState(false);

  useEffect(() => {
    const nameMapping = {
      gold: "gold",
      silver: "silver",
      platinum: "plati",
      palladium: "plad",
      rhodium: "rhodium",
    };
    setNameImg(nameMapping[name] || "gold");
    setIsGoldOrSilver(name === "gold" || name === "silver");
    setIsCheckImage(name === "rhodium" ? false : true);
  }, [name]);

  const getImage = (name: string, symbol: string) => {
    let imageNames = ["0030lns", "0060lns", "0182nys", "0365nys", "1825nys"];

    if (name === "rhodium") {
      imageNames = ["0030lns", "0060lns", "0182lns", "0365lns", "1825lns"];
    }

    if (isGoldOrSilver) {
      imageNames.push("3650nys");
    }

    return imageNames.map((imageName) => (
      <img
        key={imageName}
        src={`https://www.kitco.com/LFgif/${symbol}${imageName}.gif`}
      />
    ));
  };

  return (
    <div className="w-[calc(100%_-_316px)] pl-5">
      <div className="flex gap-5 lg:grid-cols-3 justify-items-end">
        {/* Main Content  */}
        <div className="col-span-1 lg:col-span-2">
          <div className="mt-[34px]">
            <div className="mb-[30px]">
              {isCheckImage && (
                <img
                  id={`chart_live_${name}`}
                  src={`https://www.kitco.com/images/live/${nameImg}.gif`}
                  alt={`Live 24hrs ${name} chart`}
                />
              )}
            </div>
            {isGoldOrSilver && isCheckImage && (
              <div className="hidden lg:block mb-[30px]">
                <img
                  id={`chart_ny_${name}`}
                  src={`https://www.kitco.com/images/live/ny${nameImg}.gif`}
                  alt={`Live New York ${name} Chart`}
                />
              </div>
            )}

            <AdvertisingSlot
              viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
              id={"oop"}
              className={
                "min-h-[250px] min-w-[300px] mx-auto bg-red-400 mb-[30px]"
              }
            />
            <div className="flex flex-wrap gap-2.5 justify-center">
              {getImage(name, symbol)}
            </div>
            <Spacer className="h-20" />
          </div>
        </div>

        {/* Right Section */}
        <aside className="hidden lg:block lg:col-span-1  w-[300px] mt-[34px]">
          <AdvertisingSlot
            viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
            id={"right-banner-2"}
            className={"min-h-[250px] w-[300px] mx-auto bg-red-400"}
          />
          <div className="my-[30px]">
            <LatestNewsSection />
          </div>
        </aside>
      </div>
    </div>
  );
};

const LatestNewsSection: FC = () => {
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: {
        urlAlias: `/news/category/commodities`,
        limit: 5,
        offset: 0,
      },
      options: { enabled: true },
    }),
  );

  return (
    <div className="flex flex-col">
      <h2 className="text-[20px] pb-2.5 border-b border-ktc-borders uppercase">
        <span>Latest News</span>
      </h2>
      <div className="flex flex-grow flex-col">
        {data?.nodeListByCategory?.items
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment) => {
            return (
              <div className="flex mt-5" key={x.id}>
                <TeaserTextOnly
                  key={x?.id}
                  node={x}
                  hideSummary={true}
                  size={"sm"}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
