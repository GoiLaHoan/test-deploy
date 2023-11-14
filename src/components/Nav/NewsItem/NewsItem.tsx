import Link from "next/link";

import * as Navigation from "./../Composables";
import NewsMenu from "./NewsMenu";

const NewsItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <Link href="/news" className="text-white font-medium">
          News
        </Link>
      </Navigation.Trigger>
      <Navigation.Content>
        <NewsMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default NewsItem;
