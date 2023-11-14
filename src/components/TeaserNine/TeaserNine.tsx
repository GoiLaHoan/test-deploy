import Link from "next/link";
import { FC } from "react";

import cs from "~/src/utils/cs";
import dates from "~/src/utils/dates";
import hrefMatcher from "~/src/utils/hrefMatcher";

import styles from "./TeaserNine.module.scss";

interface Props {
  category?: string;
  title?: string;
  href?: string;
  summary?: string;
  date?: string;
  loading?: boolean;
  className?: string;
}

const TeaserNine: FC<Props> = (props) => {
  return (
    <Link
      className={cs([styles.hover, props.className])}
      as={props.href}
      href={hrefMatcher(props.href)}
    >
      <>
        <h6 className="text-blue-500">{props.category}</h6>
        <h4 className={cs([styles.title, "line-clamp-3"])}>{props.title}</h4>
        <div
          className="text-gray-summary line-clamp-3"
          dangerouslySetInnerHTML={{ __html: props?.summary }}
        ></div>
        <p className="text-gray-date mt-2">{dates.dayTime(props.date)}</p>
      </>
    </Link>
  );
};

export default TeaserNine;
