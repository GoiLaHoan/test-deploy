import React from "react";
import { FC } from "react";
import LayoutServices from "~/src/components/LayoutServices/LayoutServices";
import About from "~/src/components/LayoutServices/Sections/About";
import Contact from "~/src/components/LayoutServices/Sections/Contact";
import Durations from "~/src/components/LayoutServices/Sections/Durations";
import Header from "~/src/components/LayoutServices/Sections/Header";
import Markets from "~/src/components/LayoutServices/Sections/Markets";
import OrderUs from "~/src/components/LayoutServices/Sections/OrderUs";
import Samples from "~/src/components/LayoutServices/Sections/Samples";
import Strategies from "~/src/components/LayoutServices/Sections/Strategies";
import Team from "~/src/components/LayoutServices/Sections/Team";

const CPMGroupSignals: FC<any> = () => (
  <LayoutServices title="CPM Group Trade Signals">
    <Header />
    <About />
    <Markets />
    <Strategies />
    <Durations />
    <Samples />
    <Team />
    <OrderUs />
    <Contact />
    <a href="#">
      <div id="back-to-top"></div>
    </a>
    <div id="preloader">
      <div className="preloader">
        <span /> <span /> <span /> <span />{" "}
      </div>
    </div>
  </LayoutServices>
);

export default CPMGroupSignals;
