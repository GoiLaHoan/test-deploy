import Link from "next/link";

import * as Navigation from "./../Composables";
import MoreMenu from "./MoreMenu";

const MoreItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link
          className="text-white whitespace-nowrap font-medium"
          href="/price/precious-metals"
        >
          More +
        </Link>
      </Navigation.Trigger>
      <Navigation.Content>
        <MoreMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default MoreItem;
