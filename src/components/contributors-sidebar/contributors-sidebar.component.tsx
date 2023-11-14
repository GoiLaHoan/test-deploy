import Link from "next/link";
import { FC } from "react";
import { NewsTopContributorsQuery } from "~/src/generated";
import styles from "./contributors-sidebar.module.scss";

export const ContributorsSidebar: FC<{ data: NewsTopContributorsQuery }> = ({
  data,
}) => {
  return (
    <div className={styles.contributorsSidebar}>
      <div>
        <h2>Contributors</h2>
        <ul>
          {data?.topContributors?.slice(0, 10)?.map((reporter) => (
            <li key={reporter.id}>
              <Link href={reporter.urlAlias}>
                <div className={styles.imgWrapperCircle}>
                  <img
                    className="w-[30px] h-[30px] object-contain bg-[#f7f7f7]"
                    src={reporter.imageUrl ?? "/default-avatar.svg"}
                    alt={reporter.name}
                  />
                </div>
                {reporter.name}
                <span>&gt;</span>
              </Link>
            </li>
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
