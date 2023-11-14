import type { NextApiRequest, NextApiResponse } from "next";

const KITCO_SUBSCRIPTIONS_URL = `https://connect.kitco.com/subscription/ws/subscribe`;

export default async function servicesSubscriptions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { urlSafeEmail, ...rest } = req.body;
  console.log("URL SAFE EMAIL", urlSafeEmail);

  const submission = await fetch(
    `${KITCO_SUBSCRIPTIONS_URL}/?sourceId=14&channels=${rest.channels}&email=${urlSafeEmail}&ipAddress=IP`,
    {
      method: "POST",
      body: JSON.stringify(rest),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  console.log(
    "API subscribe to services response status from connect.kitco.com",
    submission.status,
  );
  if (submission.status !== 200) {
    return res.status(submission.status).json({ message: "Error" });
  }
  return res.status(200).json({ message: "Success" });
}
