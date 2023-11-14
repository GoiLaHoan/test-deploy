import Link from "next/link";
import styles from "./CryptoMarkets.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { useQuery } from "react-query";
import { cryptos } from "~/src/lib/cryptos-factory.lib";
import { CryptoComparePriceFull } from "~/src/generated";
import { colorize } from "~/src/utils/colorize-change.util";
import { convertToLowerCase } from "~/src/utils/convertToLowerCase";

interface Item
  extends Pick<
    CryptoComparePriceFull,
    "fromSymbol" | "changePct24HourCalculated" | "imageUrl" | "price"
  > {
  name: string;
}

const CryptoMarkets = () => {
  const items = [
    { id: 0, name: "Bitcoin", symbol: "BTC" },
    { id: 1, name: "Ethereum", symbol: "ETH" },
    { id: 2, name: "XRP", symbol: "XRP" },
  ];

  const { data } = useQuery(
    cryptos.cryptosTable({
      variables: {
        symbols: items.map((item) => item.symbol).join(","),
        currency: "USD",
      },
      options: {
        // @ts-ignore
        select: (res) => {
          const hashMap = new Map(
            items.map((item) => [item.symbol, item.name]),
          );

          const transformedResults = res?.GetCryptoComparePriceFull?.map(
            (item) => ({
              ...item,
              name: hashMap.get(item.fromSymbol),
            }),
          );
          return transformedResults;
        },
      },
    }),
  );

  // typescript is mega upset about the transformation above, so let's just alias
  const transformedItems = data as Item[];

  return (
    <div className="border border-ktc-borders relative">
      <Link href="/price/crypto" className={"block h-[88px]"}>
        <div className={styles.ribbon}>
          <div className={styles.ribbonTopRight}>new</div>
        </div>
        <Image
          width={206}
          height={31}
          className="absolute left-[30px] top-[20px]"
          src={"/crypto-logo/crypto_logo-cropped.svg"}
          alt="Crypto Markets"
        />
      </Link>
      <Link href="/price/crypto">
        <div className={styles.title}>
          <h3 className="font-semibold capitalize text-[16px] leading-[25px]">
            {"Today's Crypto Markets"}
          </h3>
        </div>
      </Link>
      <div className={styles.content}>
        {transformedItems?.map((x) => (
          <div className={styles.topCrypto} key={x.fromSymbol}>
            <div className={styles.topCryptoTitle}>
              <Image
                width={24}
                height={24}
                src={`https://cryptocompare.com${x.imageUrl}`}
                alt={x.name}
                className="w-[24px] h-[24px]"
              />
              <Link href={`/price/${convertToLowerCase(x.name)}`}>
                {x.name}
              </Link>
            </div>
            <div className={styles.topCryptoPrice}>{"$" + x.price}</div>
            <div
              className={clsx(
                styles.topCryptoStats,
                colorize(x.changePct24HourCalculated),
              )}
            >
              <span>{x.changePct24HourCalculated.toFixed(2) + "%"}</span>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/price/crypto"
        target="_blank"
        className={clsx(
          "block items-center gap-2 opacity-100 border-t border-solid border-[#ccc] clear-both h-auto font-bold text-[14px] no-underline py-2.5 text-center",
          "hover:underline hover:text-[#c06a24]",
        )}
      >
        More crypto markets and news...
      </Link>
    </div>
  );
};

export default CryptoMarkets;
