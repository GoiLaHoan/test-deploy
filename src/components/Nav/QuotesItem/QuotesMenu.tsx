import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

export const fixes: SectionItems[] = [
  { name: "London Fix", href: "/allmetalquotes/londonfix" },
  { name: "Shanghai Gold Fix", href: "/price/shanghai-benchmark" },
  //   {
  //   name: 'Kitco Gold and Precious Metals Fix',
  //   href: '/allmetalquotes/fix',
  // },
];

export const metals: SectionItems[] = [
  { name: "Gold", href: "/charts/[commodity]", as: "/charts/gold" },
  {
    name: "Silver",
    href: "/charts/[commodity]",
    as: "/charts/silver",
  },
  {
    name: "Platinum",
    href: "/charts/[commodity]",
    as: "/charts/platinum",
  },
  {
    name: "Palladium",
    href: "/charts/[commodity]",
    as: "/charts/palladium",
  },
];

export const extras: SectionItems[] = [
  { name: "Metals Futures", href: "/markets/futures/metals" },
  { name: "Text Quotes", href: "/price/precious-metals/text-quotes" },
  { name: "Free Web Quotes Banners", href: "/price" },
];

const QuotesMenu = () => {
  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList title="Fix Prices" items={fixes} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Precious Metals" items={metals} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Extras" items={extras} />
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
};

export default QuotesMenu;
