import type { NextRequest } from "next/server";
import fetch from "node-fetch";

export const config = {
  runtime: "edge",
};

const base = `http://kitco2.websol.barchart.com/?module=screener`;

export default async function (_req: NextRequest) {
  const formedData = {};
  await fetch(`${base}&preset=52wkhighMetals&results=5&output=json`)
    .then((res) => res.json())
    .then((data) => {
      const arr = [];
      Object.entries(data.quotes).map((x) => arr.push(x[1]));
      formedData["gainers"] = arr;
    });

  await fetch(`${base}&preset=52wklowMetals&results=5&output=json`)
    .then((res) => res.json())
    .then((data) => {
      const arr = [];
      Object.entries(data.quotes).map((x) => arr.push(x[1]));
      formedData["losers"] = arr;
    });

  await fetch(`${base}&preset=52wkhighpctMetals&results=5&output=json`)
    .then((res) => res.json())
    .then((data) => {
      const arr = [];
      Object.entries(data.quotes).map((x) => arr.push(x[1]));
      formedData["fiftytwowkgainers"] = arr;
    });

  await fetch(`${base}&preset=52wklowpctMetals&results=5&output=json`)
    .then((res) => res.json())
    .then((data) => {
      const arr = [];
      Object.entries(data.quotes).map((x) => arr.push(x[1]));
      formedData["fiftytwowklosers"] = arr;
    });

  // @ts-ignore
  return Response.json(formedData);
}
