import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

import React from "react";
import { clsx } from "clsx";
import css from "./LayoutJewelers.module.scss";

const LayoutJewelers = ({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) => {
  return (
    <div>
      <Header title={title} />
      <div className="py-8">
        <AdvertisingSlot
          id={"leaderboard"}
          className={clsx(
            "h-[100px] w-[320px] md:h-[90px] md:w-[728px]",
            "mx-auto bg-red-400",
            "flex justify-center items-center",
          )}
          viewportsEnabled={{ desktop: true, tablet: true, mobile: true }}
        />
      </div>
      <Nav />
      <div className="relative h-5 md:h-10"></div>
      <main className={css.fontify}>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutJewelers;
