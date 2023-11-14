import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

export const charts: SectionItems[] = [
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
  {
    name: "Rhodium",
    href: "/charts/[commodity]",
    as: "/charts/rhodium",
  },
];

export const forYou: SectionItems[] = [
  { name: "Free Charts on your Web Site", href: "http://www.kitconet.com/" },
  { name: "Free Web Quote Banners", href: "https://www.kitco.com/price/" },
];

const ChartsMenu = () => {
  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList title="Charts" items={charts} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="For you" items={forYou} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        {/* <SectionList title="Extras" items={currencies} /> */}
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
};

export default ChartsMenu;
