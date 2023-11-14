import FooterError from "../FooterError/FooterError";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

import styles from "./LayoutError.module.scss";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const LayoutError = ({ children, title }: Props) => {
  return (
    <>
      <Header title={title} />
      <Nav />
      <main className={styles.mainApp404Wrapper}>{children}</main>
      <FooterError />
    </>
  );
};

export default LayoutError;
