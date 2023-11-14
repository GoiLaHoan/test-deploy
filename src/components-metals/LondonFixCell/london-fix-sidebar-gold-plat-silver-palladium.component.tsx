import dayjs from "dayjs";
import BlockShell from "~/src/components/BlockShell/BlockShell";
import priceFormatter from "~/src/utils/price-formatter";
import cs from "~/src/utils/cs";
import { useLondonFixCurrencyData } from "./use-london-fix-currency-data.hook";

const b = "border border-ktc-date-gray border-l-0 border-b-0";

export function LondonFixSidebarGoldSilverPlatinumPalladium() {
  const { data } = useLondonFixCurrencyData();

  const d = data?.londonFixUSD?.results?.[0];

  return (
    <BlockShell title="London Fix">
      <table className={cs(["w-full border-collapse", b])}>
        <thead>
          <tr>
            <th className={cs(["text-left pl-2", b])}>
              {!d?.timestamp
                ? "-"
                : dayjs.unix(d?.timestamp).format("MMM DD, YYYY")}
            </th>
            <th className={cs(["text-right pr-2", b])}>AM</th>
            <th className={cs(["text-right pr-3", b])}>PM</th>
          </tr>
        </thead>
        <tbody>
          <Cell label="Gold" am={d?.goldAM} pm={d?.goldPM} />
          <Cell label="Silver" am={d?.silver} pm={d?.silver} />
          <Cell label="Platinum" am={d?.platinumAM} pm={d?.platinumPM} />
          <Cell label="Palladium" am={d?.palladiumAM} pm={d?.palladiumPM} />
        </tbody>
      </table>
    </BlockShell>
  );
}

function Cell(p: {
  label: string;
  am: number | undefined;
  pm: number | undefined;
}) {
  return (
    <tr>
      <th className={cs(["text-left pl-2", b])}>{p.label}</th>
      <td className={cs(["text-right pr-1 py-1", b])}>
        {priceFormatter(p.am) || "-"}
      </td>
      <td className={cs(["text-right pr-2 py-1", b])}>
        {priceFormatter(p.pm) || "-"}
      </td>
    </tr>
  );
}
