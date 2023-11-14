import dayjs from "dayjs";
import styles from "./ArticleTileMini.module.scss";

interface Props {
  id: number | string | null;
  author?: string;
  title?: string;
  category?: any;
  date?: any;
  url?: string;
  teaserHeadline?: string;
}

const ArticleTileMini = ({
  id,
  author,
  title,
  category,
  date,
  url,
  teaserHeadline,
}: Props) => {
  if (!id) {
    return (
      <div className={styles.loading}>
        <p></p>
        <h3></h3>
        <p></p>
      </div>
    );
  }

  return (
    <div key={id} className={styles.articleContainer}>
      <p>{category}</p>
      <a href={url}>
        <h3>{teaserHeadline ?? title}</h3>
      </a>
      <span>
        {author && author} {dayjs(date).format("MMM DD")}
      </span>
    </div>
  );
};

export default ArticleTileMini;
