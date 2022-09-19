import NftList from 'components/NftList';
import { useNftCollection } from 'hooks/useNftCollection';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { collections } from 'utils/constants';

const MyNftPage: NextPage = () => {
  const {
    query: { slug },
  } = useRouter();

  const collection = collections.find((c) => c.slug === slug);

  const { nfts, pageKey, loadMoreItems, isLoading } = useNftCollection(
    collection?.address
  );

  return (
    <div>
      {collection && nfts && (
        <NftList
          title={collection.name}
          nfts={nfts}
          moreItems={!!pageKey}
          loadMoreItems={loadMoreItems}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MyNftPage;
