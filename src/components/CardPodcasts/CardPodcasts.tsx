import { FC, Fragment } from "react";
import styles from "./CardPodcasts.module.scss";
interface Props {
  urlIframe: string;
  title: string;
  description: string;
  connect: { name: string; url: string }[];
}

export const CardPodcasts: FC<Props> = (props) => {
  const SubscribeList = (): JSX.Element => {
    return (
      <>
        {props.connect?.map((item, index) => {
          return (
            <Fragment key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <iframe
        frameBorder="no"
        scrolling="no"
        seamless
        className="h-[400px] w-full lg:w-[400px]"
        src={props.urlIframe}
      ></iframe>
      <div className={styles.cardItem}>
        <div className={styles.cardContentWrap}>
          <h2 className={styles.cardTitle}>{props.title}</h2>
          <div className={styles.cardDescription}>{props.description}</div>
        </div>
        <div className={styles.cardConnect}>
          Subscribe on&nbsp;
          <SubscribeList />
        </div>
      </div>
    </div>
  );
};
