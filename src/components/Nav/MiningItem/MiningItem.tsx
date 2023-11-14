import Link from "next/link";

import * as Navigation from "./../Composables";
import MiningMenu from "./MiningMenu";

const MiningItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link className="text-white font-medium" href="/news/category/mining">
          Mining
        </Link>
      </Navigation.Trigger>

      <Navigation.Content>
        <MiningMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default MiningItem;
