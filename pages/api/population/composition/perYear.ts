import type { NextApiRequest, NextApiResponse } from "next";

// TODO IF定義を別ファイルに移行
type Response = {
  message: null;
  result: CompositionResult;
};

type CompositionResult = {
  boundaryYear: number;
  data: CompositionData[];
};

type CompositionData = {
  label: string;
  data: Composition[];
};

type Composition = {
  year: number;
  value: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.RESAS_API_KEY as string;
  // TODO error handling
  const cityCode = req.query.cityCode;
  const prefCode = req.query.prefCode;
  const addArea = req.query.addArea;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESAS_ENDPOINT}${process.env.NEXT_PUBLIC_RESAS_API_V1}/population/composition/perYear?cityCode=${cityCode}&prefCode=${prefCode}&addArea=${addArea}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
  const composition: Response = await response.json();
  return res.status(200).json(composition);
}
