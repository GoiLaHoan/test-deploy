import Link from "next/link";
import { FC } from "react";
import { ReportersQuery } from "~/src/generated";
import styles from "./reporters-sidebar.module.scss";

export const ReportersSidebar: FC<{ data: ReportersQuery }> = ({ data }) => {
  return (
    <div className={styles.reportersSidebar}>
      <div>
        <h2>Reporters</h2>
        <ul>
          {data?.reporters?.map((reporter) => (
            <li key={reporter.id}>
              <Link href={reporter.urlAlias}>
                <div className={styles.imgWrapperCircle}>
                  <img
                    className="w-[30px] h-[30px] object-cover bg-[#f7f7f7]"
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
      </div>
    </div>
  );
};
