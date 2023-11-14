import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

export const news: SectionItems[] = [
  {
    name: "Mining News",
    href: "/news/category/mining",
    as: "/news/category/mining",
  },
];

export const capital: SectionItems[] = [
  {
    name: "Kitco Gibson Capital",
    href: "http://www.kitcogibson.com/KGCapital/Home",
  },
];

export const sector: SectionItems[] = [
  { name: "Gold", href: "/mining/stocks/-MIGL" },
  { name: "Silver", href: "/mining/stocks/-MISI" },
  { name: "Iron", href: "/mining/stocks/-MIIR" },
  { name: "Base Metals", href: "/mining/stocks/-MEPF" },
  { name: "Non-Ferous", href: "/mining/stocks/-MINF" },
  {
    name: "Latest Press Releases",
    href: "/mining/press-release",
    as: "/mining/press-release",
  },
];

export const stocks: SectionItems[] = [
  { name: "XAU", href: "/mining/[name]", as: "/mining/XAU" },
  { name: "HUI", href: "/mining/[name]", as: "/mining/HUI" },
  { name: "JSE Gold", href: "/mining/[name]", as: "/mining/JSE" },
  { name: "TSX Gold", href: "/mining/[name]", as: "/mining/TSX" },
];

function MiningMenu() {
  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList title="News" items={news} />
        <SectionList title="Capital" items={capital} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Mining by Sector" items={sector} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Mining Stock Indices" items={stocks} />
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
}

export default MiningMenu;
