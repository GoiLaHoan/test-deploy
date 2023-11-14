import React from "react";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import BlockShell from "~/src/components/BlockShell/BlockShell";
import styles from "./InvestorInformation.module.scss";
import Link from "next/link";
import { LeadGen } from "~/src/generated";
import Image from "next/image";
import cs from "~/src/utils/cs";

const InvestorInformation = () => {
  const { data } = useQuery(
    news.leadGen({
      options: {
        enabled: true,
      },
    }),
  );

  return (
    <BlockShell title={"Investor Information "}>
      <div>
        <h3 className={styles.subTitle}>Sponsored content</h3>
        <ul>
          {data?.queue?.items?.map((item: LeadGen) => (
            <li key={item.id} className={styles.leadGenItem}>
              <Link
                href={item?.urlAlias}
                className={cs([
                  "flex justify-between items-center",
                  item?.featured && "font-bold",
                ])}
              >
                <span>{item?.title}</span>
                <span>
                  {item?.featured && (
                    <Image
                      width={9}
                      height={18}
                      src={"/arrow-red.png"}
                      alt="leadGen featured"
                    />
                  )}
                  {!item?.featured && (
                    <Image
                      width={9}
                      height={18}
                      src={"/arrow-blue.png"}
                      alt="leadGen"
                    />
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BlockShell>
  );
};

export default InvestorInformation;
