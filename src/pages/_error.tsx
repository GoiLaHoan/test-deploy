import LayoutError from "~/src/components/LayoutError/LayoutError";
import Link from "next/link";
import styles from "./_error.module.scss";

const Error = ({ statusCode }) => (
  <LayoutError title={`Error ${statusCode}`}>
    <main className={styles.wrapItUp}>
      <h1 className={styles.text}>Oops!</h1>
      <img src="/404/404.svg" alt="Error 404" />
      <h1 className={styles.text}>Page Not Found</h1>
      <div className={styles.content}>
        The page you are looking for might have been removed, had it’s name
        changed or is temporarily unavailable.
      </div>
      <Link className={styles.goBack} href="/">
        BACK TO THE HOMEPAGE
      </Link>
      <br />
    </main>
  </LayoutError>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
