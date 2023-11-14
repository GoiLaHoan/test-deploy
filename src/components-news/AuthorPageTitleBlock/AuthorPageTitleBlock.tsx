import { type FC, useEffect, useState } from "react";

import { Socials } from "~/src/components/socials/Socials";
import { Author } from "~/src/generated";
import StringToUrl from "~/src/utils/stringToUrl";

import styles from "./AuthorPageTitleBlock.module.scss";
import cs from "~/src/utils/cs";
import { AuthorRolesValues, authorRoles } from "~/src/lib/author-roles.lib";

interface Props {
  loading?: boolean;
  author: Author | null;
}

const AuthorPageTitleBlock: FC<Props> = ({ loading, author }) => {
  if (loading) {
    return (
      <div className={styles.flexWrapper}>
        <div className={styles.imageLoading}></div>
        <div>
          <p className={styles.bioLoading}></p>
          <h3 className={styles.nameLoading}></h3>
          <p className={styles.bioLoading}></p>
        </div>
      </div>
    );
  }

  const [imgSrc, setImgSrc] = useState<string | undefined>(author?.imageUrl);
  useEffect(() => {
    setImgSrc(author?.imageUrl);
  }, [author?.imageUrl]);

  const fallBack = "/fallbacks/ktc_img_fallback_md.jpg";
  const onError = () => setImgSrc(fallBack);

  const getAuthorRole = (roles: string[]): AuthorRolesValues => {
    if (roles?.includes(authorRoles.reporter)) {
      return authorRoles.reporter;
    }

    if (roles?.includes(authorRoles.contributor)) {
      return authorRoles.contributor;
    }

    return "";
  };

  return (
    <div className={styles.flexWrapper}>
      <div className={styles.imageContainer}>
        <img
          src={imgSrc ?? fallBack}
          alt="Author Image"
          className={styles.authorImage}
          onError={onError}
        />
      </div>
      <div className={cs([styles.authorContentFlex, styles.authorWrapper])}>
        <div>
          <p className={styles.authorType}>{getAuthorRole(author?.roles)}</p>
          <h2 className={styles.name}>{author?.name}</h2>
          <h5 className={styles.title}>{author?.title}</h5>
          <div
            dangerouslySetInnerHTML={{ __html: author.body }}
            className={styles.bio}
          ></div>
        </div>
        <div className={styles.socials}>
          <Socials
            email={author.contactEmail}
            facebook={author.facebookId}
            linkedIn={author.linkedInId}
            twitter={author.twitterId}
            authorWebsite={StringToUrl(author.authorWebsite)}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorPageTitleBlock;
