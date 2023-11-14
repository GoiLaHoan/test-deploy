import { FC, useCallback } from "react";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import { ReporterOrContributorItem } from "../ReporterOrContributorItem/ReporterOrContributorItem";

import styles from "./ContributorsCell.module.scss";

const ContributorsCell: FC = () => {
  const { data } = useQuery(
    news.topContributors({
      options: {
        enabled: true,
        select: useCallback((d) => {
          return {
            ...d,
            topContributors: [
              ...d.topContributors.filter((x) => x.hidden === false),
            ],
          };
        }, []),
      },
    }),
  );

  return (
    <div className={styles.contributorsSidebar}>
      <div>
        <h2>Contributors</h2>
        <ul>
          {data?.topContributors?.slice(0, 10)?.map((reporter) => (
            <ReporterOrContributorItem item={reporter} key={reporter.id} />
          ))}
        </ul>
        {/* TODO: Handle link contributors */}
        {/* <Link className={styles.showMore} href="/">
          + Show More Contributors
        </Link> */}
      </div>
    </div>
  );
};

export default ContributorsCell;
