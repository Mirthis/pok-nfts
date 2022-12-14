import { Nft } from 'alchemy-sdk';
import Link from 'next/link';
import { useState } from 'react';
import NftItem from './NftItem';
import NftModal from './NftModal';
import Spinner from './ui/Spinner';

const findNft = (
  nfts: Nft[],
  address: string,
  tokenId: string
): Nft | undefined => {
  return nfts.find(
    (n) => n.contract.address === address && n.tokenId === tokenId
  );
};

const NftList = ({
  nfts,
  nftCount,
  moreItems,
  loadMoreItems,
  isLoading = false,
}: {
  nfts: Nft[];
  nftCount?: number;
  moreItems?: boolean;
  isLoading?: boolean;
  loadMoreItems?: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalNft, setModalNft] = useState<Nft>();

  const handleNftClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { address, tokenid: tokenId } = event.currentTarget.dataset;
    if (!address || !tokenId) return;
    const nft = findNft(nfts, address, tokenId);
    if (nft) {
      setModalNft(nft);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalNft(undefined);
    setModalOpen(false);
  };

  // const handleLoadMoreItems = () => {
  //   if (loadMoreItems) {
  //     loadMoreItems();
  //   }
  // };

  return (
    <div>
      {!!nftCount && nftCount !== 0 && (
        <div className="mb-4 flex gap-4">
          <p>
            {nfts.length} of {nftCount}
          </p>
          {nfts.length < nftCount && (
            <Link href="nfts">
              <a className="font-bold uppercase tracking-widest text-sky-300">
                See more
              </a>
            </Link>
          )}
        </div>
      )}

      {nfts.length > 0 ? (
        <>
          <NftModal open={modalOpen} nft={modalNft} closeModal={closeModal} />
          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {nfts
              // .filter((nft) => !nft.metadataError)
              .map((nft) => (
                <NftItem
                  key={`nft-${nft.tokenId}`}
                  nft={nft}
                  onClick={handleNftClick}
                />
              ))}
          </div>
          {moreItems && (
            <div className="my-6 flex flex-col items-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  onClick={() => loadMoreItems?.()}
                  className="rounded-lg p-2 text-center font-bold uppercase tracking-widest text-sky-300"
                >
                  Load more items
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <p>No NFT found!</p>
      )}
    </div>
  );
};

export default NftList;
