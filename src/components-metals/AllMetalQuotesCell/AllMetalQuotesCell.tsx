import type { FC } from "react";
import BidAskGrid from "~/src/components/BidAskGrid/BidAskGrid";
import BidAskGridMobile from "~/src/components/BidAskGrid/BidAskGridMobile";
import KitcoTable from "~/src/components/KitcoTable/KitcoTable";
import RelatedMetals from "~/src/components-metals/RelatedMetals/RelatedMetals";
import useScreenSize from "~/src/utils/useScreenSize";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useCurrencyReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";

const AllMetalQuotesCell: FC<{
  title?: string;
  componentAlias?: "bidAskGrid" | "relatedMetals" | "kitcoTable";
}> = ({ title, componentAlias }) => {
  const { isTablet, isMobile } = useScreenSize();
  const currencyy = useCurrencyReadOnlyAtom();

  const { data, isFetching } = useQuery(
    metals.allMetalsQuote({
      variables: {
        timestamp: currentTimestamp(),
        currency: currencyy.symbol ?? "USD",
      },
      options: {
        keepPreviousData: true,
      },
    }),
  );

  const dataAsArray =
    [
      data?.gold,
      data?.silver,
      data?.platinum,
      data?.palladium,
      data?.rhodium,
    ] ?? [];

  if (componentAlias === "relatedMetals") {
    return <RelatedMetals data={data} />;
  }

  if (componentAlias === "kitcoTable") {
    return <KitcoTable data={dataAsArray} title="Kitco Precious Metals" />;
  }

  return (
    <>
      {isTablet || isMobile ? (
        <BidAskGridMobile
          title={title}
          values={!dataAsArray[0] === undefined ? [] : dataAsArray}
        />
      ) : (
        <BidAskGrid
          isLoading={isFetching}
          title={title}
          data={!dataAsArray[0] === undefined ? [] : dataAsArray}
        />
      )}
    </>
  );
};

export default AllMetalQuotesCell;
