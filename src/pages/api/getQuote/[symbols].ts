import type { NextRequest } from "next/server";
import fetch from "node-fetch";

export const config = {
  runtime: "edge",
};
const base = `http://ondemand.websol.barchart.com/getQuote.json?apikey=44f0395dd7f6659f4ccc43e2c43200fd&symbols=`;

export default async function (req: NextRequest) {
  const url = new URL(req.url);
  const symbols = url.pathname.replace("/api/getQuote/", "");
  const data = await fetch(
    `${base}${symbols}`, // eslint-disable-line
  )
    .then((res) => res.json())
    .then((data) => data);

  // @ts-ignore
  return Response.json(data);
}
