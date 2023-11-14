export interface MetalItem {
  name: string;
  symbol: string;
}

export const preciousMetals: Array<MetalItem> = [
  { name: "gold", symbol: "AU" },
  { name: "silver", symbol: "AG" },
  { name: "platinum", symbol: "PT" },
  { name: "palladium", symbol: "PD" },
  { name: "rhodium", symbol: "RH" },
];

export const baseMetals: Array<MetalItem> = [
  { name: "aluminum", symbol: "AL" },
  { name: "copper", symbol: "CU" },
  { name: "lead", symbol: "PB" },
  { name: "nickel", symbol: "NI" },
  { name: "zinc", symbol: "ZN" },
];

export const allMetals: Array<MetalItem> = preciousMetals.concat(baseMetals);
