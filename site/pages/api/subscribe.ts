// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const getResponseMessage = (status: number) => {
  switch (status) {
    case 200:
      return "Thank you! (again... ;)";
    case 201:
      return "Thank you! :)";
    default:
      return "";
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const webhook = process.env.SUBSCRIPTION_WEBHOOK_URL || "";
  if (webhook === "") {
    console.log("error: webhook url is empty");
    res.status(500).json({ message: "error: missing configuration" });
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  if (response.status >= 500) {
    console.error(
      "error: webhook error",
      response.status,
      response.statusText,
      response.body
    );
  }
  res
    .status(response.status)
    .json({ message: getResponseMessage(response.status) });
}
