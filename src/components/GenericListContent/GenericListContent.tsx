import React, { FC } from "react";

import ListItemOneLine from "~/src/components-news/ArticleListItems/ListItemOneLine/ListItemOneLine";

import styles from "~/src/components/LatestNewsBlock/LatestNewsBlock.module.scss";
import { NewsArticle } from "~/src/generated";

interface Props {
  data: (NewsArticle | any)[];
}

const GenericListContent: FC<Props> = ({ data }) => {
  return (
    <div className={styles.articleList}>
      {data &&
        data.map((x, idx) => (
          <ListItemOneLine
            isOdd={!(idx % 2)}
            isBold={false}
            tag={x.label}
            title={x.title}
            teaserHeadline={x?.teaserHeadline}
            source={!x.source ? "" : x.source}
            date={x.changed}
            url={x.urlAlias}
            key={x.id}
          />
        ))}
    </div>
  );
};

export default GenericListContent;
