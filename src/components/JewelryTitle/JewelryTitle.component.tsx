import Link from "next/link";
import { useRouter } from "next/router";
import dataJeweler from "~/src/lib/dataJeweler";

import cs from "~/src/utils/cs";

import styles from "./JewelryTitle.module.scss";

export const JewelryTitle = () => {
  const r = useRouter();

  const baseH1 = "uppercase text-[32px] md:text-[48px]";
  const baseSubH1 =
    "uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px]";

  const parentCSS = "text-ktc-date-gray hidden md:block";

  const subTitle = dataJeweler.find((item) => item.urlAlias === r.asPath).name;

  const showTitle = "Jewelers’ Resources";
  const handleLink = "/jeweler-resources";

  return (
    <>
      <div className="block md:flex justify-between items-center gap-5">
        <div className={styles.leftTitle}>
          <div className="flex items-center leading-[38px] md:leading-[58px] flex-wrap">
            <Link href={handleLink}>
              <h1 className={cs([baseH1, parentCSS])}>{showTitle}</h1>
            </Link>
            <h1 className={cs([baseH1, parentCSS, "px-1 md:px-2"])}>/</h1>
            <h1 className={cs([baseSubH1, "text-kitco-black"])}>{subTitle}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export const JewelryResourcesTitle = () => {
  const r = useRouter();

  const baseH1 = "uppercase text-[32px] md:text-[48px]";
  const baseSubH1 =
    "uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px]";

  const parentCSS = "text-ktc-date-gray hidden md:block";

  const subTitle = dataJeweler.find((item) => item.urlAlias === r.asPath).name;

  const showTitle = "Jewelers’ Resources";

  return (
    <>
      <div className="block lg:flex mb-5 md:mb-10 justify-between items-center gap-5">
        <div className={styles.leftResourcesTitle}>
          <div className="flex items-center leading-[38px] md:leading-[58px] flex-wrap">
            <h1 className={cs([baseH1, parentCSS])}>{showTitle}</h1>

            <h1 className={cs([baseH1, parentCSS, "px-1 md:px-2"])}>/</h1>
            <h1 className={cs([baseSubH1, "text-kitco-black"])}>{subTitle}</h1>
          </div>

          <div className="!font-lato font-bold text-xl leading-7 md:w-[540px] mt-2.5 md:mt-0 mb-[34px] md:mb-0 text-[1.125rem]">
            Calculate gold scrap right here. Real-time gold scrap value
            calculator for professionals.
          </div>
        </div>
        <div className="text-sm p-2.5 bg-[#eeeeee] md:w-[343px]">
          <strong className="font-bold">Try it now!</strong>
          <p className="mt-2.5">
            Click on&nbsp;
            <img
              src="/jewelers/icons/icon_edit.jpg"
              className="inline-block	align-middle h-[20px] w-[41px]"
            />
            &nbsp;to modify the purity of the karat.
          </p>
        </div>
      </div>
    </>
  );
};
