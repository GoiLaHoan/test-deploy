import Link from "next/link";

import * as Navigation from "./../Composables";
import ChartsMenu from "./ChartsMenu";

const ChartsItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link
          href="/charts"
          className="text-white whitespace-nowrap font-medium"
        >
          Charts &amp; Data
        </Link>
      </Navigation.Trigger>
      <Navigation.Content>
        <ChartsMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default ChartsItem;
