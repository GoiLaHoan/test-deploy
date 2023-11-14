import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { BsCheck2Square, BsSquare } from "react-icons/bs";
// TODO: FIX path resolution
import Layout from "~/src/components/Layout/Layout";
import sss from "~/src/styles/pages/EmailOffers.module.scss";

const state = { rundown: true, offers: false };
type State = typeof state;
type StateKeys = keyof State;

const DailyRecap: NextPage = () => {
  const [email, setEmail] = useState("");
  const [more, setMore] = useState<State>(state);

  function toggle(key: StateKeys): void {
    setMore((prev) => ({
      ...prev,
      [key]: !more[key],
    }));
  }

  return (
    <Layout title="Email offers">
      <div className={sss.wrapper}>
        <Image
          src="/email_offers.jpeg"
          width={503}
          height={637}
          className="relative max-h-[637px]"
          alt="Email offers"
        />
        <div className={sss.contentContainer}>
          <input
            type="email"
            placeholder="hello@youremail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={sss.inputter}
          />
          <div className="my-8">
            <ClickableItem
              value={more.rundown}
              toggle={() => toggle("rundown")}
              title="The Weekly Rundown"
              text="Hand-Picked Content From Our News Team Delivered Straight To Your Inbox Once A Week, Every Friday."
            />
            <ClickableItem
              value={more.offers}
              toggle={() => toggle("offers")}
              title="Kitco Partner Offers"
              text="Free Content And Promotions From Carefully Selected Kitco Partners."
            />
          </div>
          <p className="text-xs">
            You can withdraw your consent for any of the above communications at
            any time. Privacy policy | Contact us | Create a free account
          </p>
          <ul className={sss.linklist}>
            <li className={sss.item}>
              <a href="https://online.kitco.com/legal/privacy-policy">
                Privacy policy
              </a>
            </li>
            <li>&middot;</li>
            <li className={sss.item}>
              <a href="http://corp.kitco.com/en/contact.html">Contact us</a>
            </li>
            <li>&middot;</li>
            <li>
              <a href="https://online.kitco.com/create-account.html?fp=/legal/privacy-policy">
                Create a free account
              </a>
            </li>
          </ul>
          <button className={sss.submitBtn}>TELL ME ABOUT DEALS</button>
        </div>
      </div>
    </Layout>
  );
};

export default DailyRecap;

const ClickableItem = ({ toggle, value, title, text }) => {
  return (
    <div onClick={toggle} className="flex my-2 cursor-pointer">
      <div className="mt-1 mr-4">
        {!value ? <BsSquare /> : <BsCheck2Square />}
      </div>
      <div>
        <h6 className="text-lg font-semibold">{title}</h6>
        <p>{text}</p>
      </div>
    </div>
  );
};
