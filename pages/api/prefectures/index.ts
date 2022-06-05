import type { NextApiRequest, NextApiResponse } from "next";

// TODO IF定義を別ファイルに移行
type Response = {
  message: null;
  result: Prefecture[];
};

type Prefecture = {
  prefCode: number;
  prefName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.RESAS_API_KEY as string;
  // TODO error handling
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESAS_ENDPOINT}${process.env.NEXT_PUBLIC_RESAS_API_V1}/prefectures`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
  const prefectures: Response = await response.json();
  return res.status(200).json(prefectures);
}
