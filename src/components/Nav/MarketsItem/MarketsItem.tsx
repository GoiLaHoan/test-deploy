import Link from "next/link";

import * as Navigation from "./../Composables";
import MarketsMenu from "./MarketsMenu";

const MarketsItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link href="/markets" className="text-white font-medium">
          Markets
        </Link>
      </Navigation.Trigger>
      <Navigation.Content>
        <MarketsMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default MarketsItem;
