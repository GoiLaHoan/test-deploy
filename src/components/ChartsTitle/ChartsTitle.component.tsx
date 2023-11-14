import Link from "next/link";
import { useRouter } from "next/router";
import cs from "~/src/utils/cs";
import styles from "./ChartsTitle.module.scss";
import { SocialsKitco } from "../socials/socials-kitco.component";

export const ChartsTitle = () => {
  const r = useRouter();

  const baseH1 = `uppercase md:text-[48px] text-[32px]`;
  const baseSubH1 = `uppercase md:text-[48px] md:leading-[58px] text-[32px] leading-[38px]`;

  const parentCSS = "text-ktc-date-gray";

  const subTitle = r?.query?.name;

  const showTitle = "Live Charts";
  const handleLink = "/charts";

  return (
    <>
      <div className="flex justify-between border-b border-ktc-borders mb-4">
        <div className="block md:flex justify-between items-center gap-5 mb-2">
          <div className={styles.leftTitle}>
            <div className="flex items-center leading-[38px] md:leading-[58px] flex-wrap">
              <Link href={handleLink}>
                <h1 className={cs([baseH1, parentCSS])}>{showTitle}</h1>
              </Link>
              <h1 className={cs([baseH1, parentCSS, "px-1 md:px-2"])}>/</h1>
              <h1 className={cs([baseSubH1, "text-kitco-black"])}>
                {subTitle}
              </h1>
            </div>
          </div>
        </div>

        <SocialsKitco
          className="justify-between mx-3 hidden md:flex"
          hidePrint={true}
          listAuthorStr={""}
        />
      </div>
    </>
  );
};
