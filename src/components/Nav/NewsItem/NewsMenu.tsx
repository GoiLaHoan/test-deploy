import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

export const news: SectionItems[] = [
  { name: "Kitco Latest News", href: "/news" },
  { name: "Off The Wire", href: "/news/off-the-wire" },
  { name: "Video News", href: "/news/video" },
  { name: "Mining News", href: "/news/category/mining" },
  { name: "More News", href: "/news/more/all" },
  { name: "Outlook (Yearly Recap)", href: "/news/gold-price-outlook-2020" },
];

export const feed: SectionItems[] = [
  { name: "RSS", href: "http://news.kitco.com/rss/" },
];

export const info: SectionItems[] = [
  { name: "About Kitco News", href: "https://www.kitco.com/news/about/" },
];

function NewsMenu() {
  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList title="News" items={news} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Feed" items={feed} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Information" items={info} />
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
}

export default NewsMenu;
