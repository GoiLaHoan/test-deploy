import React from "react";
import { useRouter } from "next/router";
import { clsx } from "clsx";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";

import styles from "./Layout.module.scss";

interface Props {
  children?: React.ReactNode;
  isPageNotCrawlable?: boolean;
  title: string;
}

const PATHNAME_NO_PRINT = "/price/precious-metals/text-quotes";

const Layout = ({ children, isPageNotCrawlable = false, title }: Props) => {
  const router = useRouter();

  return (
    <>
      <Header isPageNotCrawlable={isPageNotCrawlable} title={title} />
      <div className={router.pathname === PATHNAME_NO_PRINT ? "no-print" : ""}>
        <AdvertisingSlot
          id={"leaderboard"}
          className={clsx(
            "h-[100px] w-[320px] md:h-[90px] md:w-[728px]",
            "mx-auto bg-red-400 my-[40px]",
            "flex justify-center items-center",
          )}
          viewportsEnabled={{ desktop: true, tablet: true, mobile: true }}
        />
        <Nav />
      </div>
      <div
        className={router.pathname === PATHNAME_NO_PRINT ? "no-print" : ""}
        style={{ position: "relative", height: "40px" }}
      />
      <main className={styles.mainAppWrapper}>{children}</main>
      <div className={router.pathname === PATHNAME_NO_PRINT ? "no-print" : ""}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
