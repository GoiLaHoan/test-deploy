import type { NextApiRoute } from "~/src/types/types";

export default (async function historicalPath(req, res) {
  const test = await fetch("http://www-origin.kitco.com/LFgif/aumay20.gif");
  console.log("HIT");
  res.send(test);
}) satisfies NextApiRoute;
