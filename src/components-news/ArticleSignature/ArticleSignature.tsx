import Link from "next/link";
import React, { FC } from "react";

import { Socials } from "~/src/components/socials/Socials";

import { Author } from "~/src/generated";
import styles from "./ArticleSignature.module.scss";

interface Props {
  author: Author;
}

const ArticleSignature: FC<Props> = ({ author }) => {
  return (
    <div>
      {author?.body && (
        <div
          className={styles.bio}
          dangerouslySetInnerHTML={{ __html: author?.body }}
        ></div>
      )}
      <div className={styles.linksBar}>
        {author?.name && (
          <Link className={styles.userName} href={author?.urlAlias}>
            {author?.name}
          </Link>
        )}
        <Socials
          email={author?.email}
          facebook={author?.facebookId}
          linkedIn={author?.linkedInId}
          twitter={author?.twitterId}
        />
      </div>
    </div>
  );
};

export default ArticleSignature;
