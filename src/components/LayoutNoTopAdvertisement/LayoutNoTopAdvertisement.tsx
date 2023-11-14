import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

import styles from "./LayoutNoTopAdvertisement.module.scss";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const LayoutNoTopAdvertisement = ({ children, title }: Props) => {
  return (
    <>
      <Header title={title} />
      <Nav />
      <div style={{ position: "relative", height: "60px" }}></div>
      <main className={styles.mainAppWrapper}>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutNoTopAdvertisement;
