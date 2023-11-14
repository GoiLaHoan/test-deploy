import { useCallback, useState } from "react";

export interface MetalItem {
  name: string;
  symbol: string;
}

export const metals: Array<MetalItem> = [
  { name: "Gold", symbol: "AU" },
  { name: "Silver", symbol: "AG" },
  { name: "Platinum", symbol: "PT" },
  { name: "Palladium", symbol: "PD" },
  { name: "Rhodium", symbol: "RH" },
];

const useMetalSelect = () => {
  const [metal, changeMetal] = useState<MetalItem>(metals[0]);

  const setMetal = useCallback(
    (value) => {
      changeMetal(() => metals.find((x) => x.symbol === value));

      return;
    },
    [changeMetal],
  );

  return { metal, setMetal };
};

export default useMetalSelect;
