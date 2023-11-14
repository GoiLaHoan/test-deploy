import { FC } from "react";
import LayoutAdvertising from "~/src/components/LayoutAdvertising/LayoutAdvertising";
import AboutKitco from "~/src/components/LayoutAdvertising/Sections/AboutKitco";
import AdvertiseWithKitco from "~/src/components/LayoutAdvertising/Sections/AdvertiseWithKitco";
import AudienceInterest from "~/src/components/LayoutAdvertising/Sections/AudienceInterest";
import AudienceProfile from "~/src/components/LayoutAdvertising/Sections/AudienceProfile";
import ContactForm from "~/src/components/LayoutAdvertising/Sections/ContactForm";
import DigitalGoals from "~/src/components/LayoutAdvertising/Sections/DigitalGoals";
import FooterAdvertising from "~/src/components/LayoutAdvertising/Sections/FooterAdvertising";
import HeaderTop from "~/src/components/LayoutAdvertising/Sections/HeaderTop";
import KitcoReach from "~/src/components/LayoutAdvertising/Sections/KitcoReach";
import NavAdvertising from "~/src/components/LayoutAdvertising/Sections/Nav";
import WhyKitco from "~/src/components/LayoutAdvertising/Sections/WhyKitco";

const Advertising: FC<any> = () => (
  <LayoutAdvertising title="Kitco Reach - Reach Your Digital Goals | KITCO">
    <NavAdvertising />
    <HeaderTop />
    <div id="content">
      <AboutKitco />
      <WhyKitco />
      <AdvertiseWithKitco />
    </div>
    <AudienceProfile />
    <AudienceInterest />
    <KitcoReach />
    <DigitalGoals />
    <ContactForm />
    <FooterAdvertising />
  </LayoutAdvertising>
);

export default Advertising;
