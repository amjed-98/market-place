import { Nft } from '../../@types/api';

function getNftsToShow(collectionNfts: Nft[]) {
  const nftsToShow = collectionNfts.reduce((acc, n) => {
    const existingGroup = acc.find((group) => group.title === n.name);

    if (existingGroup) {
      existingGroup.nfts.push(n);

      if (!(n.user_id && n.tx)) {
        existingGroup.availableNfts.push(n);
      }
    } else {
      const newGroup: {
        title: string;
        availableNfts: Nft[];
        nfts: Nft[];
      } = {
        title: n.name,
        availableNfts: [],
        nfts: [n],
      };

      if (!(n.user_id && n.tx)) {
        newGroup.availableNfts.push(n);
      }

      acc.push(newGroup);
    }

    return acc;
  }, [] as { title: string; availableNfts: Nft[]; nfts: Nft[] }[]);

  return nftsToShow;
}

export default getNftsToShow;
