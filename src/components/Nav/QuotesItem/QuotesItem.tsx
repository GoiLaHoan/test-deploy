import Link from "next/link";

import * as Navigation from "./../Composables";
import QuotesMenu from "./QuotesMenu";

const QuotesItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link
          href="/price/precious-metals"
          className="text-white whitespace-nowrap font-medium"
        >
          All Metal Quotes
        </Link>
      </Navigation.Trigger>

      <Navigation.Content>
        <QuotesMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default QuotesItem;
