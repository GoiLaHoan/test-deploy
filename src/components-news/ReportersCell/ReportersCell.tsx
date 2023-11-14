import { type FC, useCallback } from "react";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import styles from "./ContributorsCell.module.scss";
import { ReporterOrContributorItem } from "../ReporterOrContributorItem/ReporterOrContributorItem";

const ReportersCell: FC = () => {
  const { data } = useQuery(
    news.reporters({
      options: {
        enabled: true,
        select: useCallback((data) => {
          return {
            ...data,
            reporters: [...data.reporters.filter((x) => x.hidden === false)],
          };
        }, []),
      },
    }),
  );

  return (
    <div className={styles.contributorsSidebar}>
      <div>
        <h2>Reporters</h2>
        <ul>
          {data?.reporters?.map((reporter) => (
            <ReporterOrContributorItem item={reporter} key={reporter.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportersCell;
