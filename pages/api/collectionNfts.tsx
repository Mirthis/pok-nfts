import { NextApiRequest, NextApiResponse } from 'next';
import { alchemyClient } from 'utils/alchemySdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = Array.isArray(req.query.address)
    ? undefined
    : req.query.address;
  const pageKey = Array.isArray(req.query.pageKey)
    ? undefined
    : req.query.pageKey;
  const pageSize = Array.isArray(req.query.pageSize)
    ? undefined
    : req.query.pageSize;

  if (address && pageSize) {
    try {
      const resNfts = await alchemyClient.nft.getNftsForContract(address, {
        omitMetadata: false,
        pageKey: pageKey,
        pageSize: Number(pageSize),
      });
      res.status(200).json(resNfts);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400);
  }
}
