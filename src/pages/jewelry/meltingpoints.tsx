import React from "react";
import AdvertBlock from "~/src/components/AdvertBlock/AdvertBlock";
import BasicTable from "~/src/components/BasicTable/BasicTable";
import Layout from "~/src/components/Layout/Layout";
import PlaceholderBlock from "~/src/components/PlaceholderBlock/PlaceholderBlock";
import styles from "./meltingpoints.module.scss";

const DATA = [
  ["Aluminum", "Al", "1220", "660", "2.70", "1.423"],
  ["Antimony", "Sb", "1167", "630", "6.62", "3.448"],
  ["Beryllium", "Be", "2340", "1280", "1.82", "0.959"],
  ["Bismuth", "Bi", "520", "271", "9.80", "5.163"],
  ["Cadmium", "Cd", "610", "321", "8.65", "4.557"],
  ["Carbon", "C", "-", "-", "2.22", "1.170"],
  ["Chromium", "Cr", "3430", "1890", "7.19", "3.788"],
  ["Cobalt", "Co", "2070", "1132.2", "8.9", "4.689"],
  ["Copper", "Cu", "1981", "1083", "8.96", "4.719"],
  ["Gold, 24K Pure", "Au", "1945", "1063", "19.32", "10.180"],
  ["Iridium", "Ir", "4449", "2454", "22.50", "11.849"],
  ["Iron", "Fe", "2802", "1539", "7.87", "4.145"],
  ["Lead", "Pb", "621", "327", "11.34", "5.973"],
  ["Magnesium", "Mg", "1202", "650", "1.75", "0.917"],
  ["Manganese", "Mn", "2273", "1245", "7.43", "3.914"],
  ["Molybdenum", "Mo", "4760", "2625", "10.20", "5.347"],
  ["Nickel", "Ni", "2651", "1455", "8.90", "4.691"],
  ["Osmium", "Os", "4892", "2700", "22.50", "11.854"],
  ["Palladium", "Pd", "2831", "1555", "12.00", "6.322"],
  ["Phosphorus", "P", "111", "44", "1.82", "0.959"],
  ["Platinum, Pure", "Pt", "3224", "1773", "21.45", "11.301"],
  ["15% Irid Plat", "-", "3310", "1821", "21.59", "11.301"],
  ["10% Irid Plat", "-", "3250", "1788", "21.54", "11.349"],
  ["5% Irid Plat", "-", "3235", "1779", "21.50", "11.325"],
  ["Rhodium", "Rh", "3571", "1966", "12.44", "6.553"],
  ["Ruthenium", "Ru", "4500", "2500", "12.20", "6.428"],
  ["Silicon", "Si", "2605", "1430", "2.33", "1.247"],
  ["Silver, Pure", "Ag", "1761", "961", "10.49", "5.525"],
  ["Silver, Sterling", "-", "1640", "893", "10.36", "5.457"],
  ["Silver, Coin", "-", "1615", "879", "10.31", "5.430"],
  ["Tin", "Sn", "450", "232", "7.30", "3.846"],
  ["Zinc", "Zn", "787", "419", "7.10", "3.7758"],
];

const Meltingpoints = () => {
  return (
    <Layout title={"Stock Markets | DJIA, DOW, NASDAQ, S&P 500, NYSE"}>
      <div className={styles.container}>
        <main>
          <section className={styles.block}>
            <p>
              The specific gravity of a metal or alloy is merely the weight in
              grams of one cubic centimeter. When it is more convenient to work
              in troy weights, the number of ounces per cubic inch of any metal
              or alloy may be found by multiplying its specific gravity by the
              constant 0.52686.
            </p>
          </section>
          <section className={styles.block}>
            <h1 className={styles.tableTitle}>
              Melting Point and Weights of Various Metals and Alloys
            </h1>
            <BasicTable
              headers={[
                "Metal",
                "Symbol",
                "Fahrenheit",
                "Celsius",
                "Gravity",
                "Weight",
              ]}
              data={DATA}
            />
          </section>
        </main>
        <aside>
          <div className={styles.block}>
            <AdvertBlock />
          </div>
          <div className={styles.block}>
            <PlaceholderBlock />
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default Meltingpoints;
