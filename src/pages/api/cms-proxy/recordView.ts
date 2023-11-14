import type { NextRequest } from "next/server";

export default async (
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {
  const { searchParams } = new URL(req.url);

  const statisticsResponse = await fetch(
    `https://cms-drupal.dev.kitco.com/core/modules/statistics/statistics.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: new URLSearchParams(`nid=${req.query.nid}`),
      body: new URLSearchParams(`nid=${searchParams.get("nid")}`),
    },
  ).catch((err: Error) => err);

  if (statisticsResponse instanceof Error || !statisticsResponse.ok) {
    // @ts-ignore
    return Response.json({ status: "Failed" });
  }

  // @ts-ignore
  return Response.json({ status: "OK" });
};
