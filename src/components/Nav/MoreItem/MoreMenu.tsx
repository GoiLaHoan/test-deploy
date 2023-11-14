import { SectionItems } from "~/src/types";
import SectionList from "../SectionList/SectionList";
import * as Navigation from "./../Composables";

const MoreMenu = () => {
  const subscriptions: SectionItems[] = [
    {
      name: "Newsletters",
      href: "/services/newsletter",
      as: "/services/newsletter",
    },
    { name: "Alerts", href: "http://alerts.kitco.com/KcastAlertsWeb/" },
    {
      name: "CPM Group Trade-Signal",
      href: "https://www.kitco.com/services/cpm-group-signals/?utm_source=Kitco.com&utm_medium=servicespage&utm_campaign=TradeSignals",
    },
    {
      name: "Kitco Gold Forum",
      href: "https://gold-forum.kitco.com/register.php",
    },
  ];
  const apps: SectionItems[] = [
    { name: "iOS", href: "https://applications.kitco.com" },
    { name: "Android", href: "https://applications.kitco.com" },
    {
      name: "Kcast Gold Live",
      href: "https://applications.kitco.com/product/gold-live%E2%84%A2",
    },
    {
      name: "ScrapIt!",
      href: "https://applications.kitco.com/product/scrapit",
    },
    {
      name: "Metalynx",
      href: "https://applications.kitco.com/product/metalynx",
    },
    {
      name: "Gold Live! Desktop",
      href: "https://applications.kitco.com/product/gold-live%E2%84%A2-desktop",
    },
    {
      name: "ScrapIt! Web",
      href: "https://applications.kitco.com/product/scrapit-web",
    },
    {
      name: "Windows Taskbar",
      href: "https://applications.kitco.com/product/windows-taskbar",
    },
    {
      name: "Market Alers",
      href: "https://applications.kitco.com/product/market-alerts",
    },
  ];

  const about: SectionItems[] = [
    { name: "About Kitco", href: "https://corp.kitco.com" },
    {
      name: "Precious Metal Division",
      href: "https://corp.kitco.com/pmd.html",
    },
    { name: "Refining", href: "https://corp.kitco.com/refining.html" },
    { name: "Media Center", href: "https://corp.kitco.com/media.html" },
    { name: "Careers", href: "https://corp.kitco.com/career.html" },
    { name: "Contact Us", href: "https://corp.kitco.com/contact-us.html" },
    {
      name: "Feedback",
      href: "https://corp.kitco.com/contact-us.html#contact",
    },
    { name: "Sitemap", href: "https://kitco.com/sitemap" },
  ];

  const advert: SectionItems[] = [
    { name: "Advertise With Us", href: "https://kitco.com/advertising" },
  ];

  return (
    <Navigation.SubMenuGrid>
      <Navigation.SubMenuColumn>
        <SectionList title="Subscriptions" items={subscriptions} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="Applications" items={apps} />
      </Navigation.SubMenuColumn>
      <Navigation.SubMenuColumn>
        <SectionList title="About" items={about} />
        <SectionList title="Advertise" items={advert} />
      </Navigation.SubMenuColumn>
    </Navigation.SubMenuGrid>
  );
};

export default MoreMenu;
