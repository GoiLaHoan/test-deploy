import { useState } from "react";
// TODO: FIX path resolution
import Layout from "~/src/components/Layout/Layout";

import sss from "~/src/styles/pages/EmailOffers.module.scss";
import { BsCheck2Square, BsSquare } from "react-icons/bs";

const state = { weekly: true, offers: true, daily: true };
type State = typeof state;
type StateKeys = keyof State;

function useNewsletter() {
  const [email, setEmail] = useState("");
  const [checkboxes, setCheckboxes] = useState<State>(state);

  function toggle(key: StateKeys): void {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: !checkboxes[key],
    }));
  }

  return { email, setEmail, checkboxes, toggle };
}

const Newsletter = () => {
  const { email, setEmail, checkboxes, toggle } = useNewsletter();

  return (
    <Layout title="Email offers">
      <div className={sss.wrapper}>
        <img
          src="/email_offers.jpeg"
          width="504px"
          height="637px"
          className="relative max-h-[637px]"
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
              value={checkboxes.weekly}
              toggle={() => toggle("weekly")}
              title="The Weekly Rundown"
              text="Hand-Picked Content From Our News Team Delivered Straight To Your Inbox Once A Week, Every Friday."
            />
            <ClickableItem
              value={checkboxes.daily}
              toggle={() => toggle("daily")}
              title="The Daily Recap"
              text="Get caught up in minutes with our speedy summary of today's must-read news stories and expery opinions."
            />
            <ClickableItem
              value={checkboxes.offers}
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
          <button className={sss.submitBtn}>SIGN ME UP</button>
        </div>
      </div>
    </Layout>
  );
};

export default Newsletter;

const ClickableItem = ({ toggle, value, title, text }: any) => {
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
