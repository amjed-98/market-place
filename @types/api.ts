/* eslint-disable no-unused-vars */
type CollectionStatus = 'pending' | 'active' | 'inactive';

type Ong = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  wallet_address: string | null;
  createdAt: string;
  updatedAt: string;
};

type Artist = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  wallet_address: string | null;
  createdAt: string;
  updatedAt: string;
};
type Collection = {
  id: string;
  name: string;
  description: string | null;
  legal: string | null;
  image_url: string | null;
  publish_date: string | null;
  autoincremental_token_id: boolean;
  max_supply: number | null;
  status: CollectionStatus;
  contract_address: string | null;
  ong_id: string;
  artist_id: string;
  createdAt: string;
  updatedAt: string;
  Artist: Pick<Artist, 'id' | 'name' | 'image_url'>;
  Ong: Pick<Ong, 'id' | 'name' | 'image_url'>;
};
type Nft = {
  id: string;
  currency: string | null;
  name: string;
  image_url: string | null;
  price: string | null;
  user_id: string | null;
  description: string | null;
  token_id: string | null;
  size: string;
  width: number;
  height: number;
  Collection: Pick<Collection, 'Artist' | 'Ong' | 'id' | 'legal' | 'name'>;
  Artist: Artist;
  tx: string | null;
  cryptoPrice: number;
  cryptoCurrency: 'MATIC';
};

type CollectionDetails = Collection & {
  Artist: Artist;
  Ong: Artist;
};

type EthereumEvent = 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged';
type EthereumMethod = 'eth_accounts' | 'eth_requestAccounts';
type WalletAddress = [address: string];

type Ethereum = {
  request: ({ method }: { method: EthereumMethod; params: any[] }) => Promise<WalletAddress>;
  selectedAddress: string;
  isMetaMask: boolean;
  on: (event: EthereumEvent, cb: (address: WalletAddress) => void) => Ethereum;
  removeListener: (event: EthereumEvent, cb: (address: WalletAddress) => void) => Ethereum;
};

type EthereumWindow = Window & { ethereum: Ethereum };

export type {
  Artist,
  Collection,
  CollectionDetails,
  CollectionStatus,
  Nft,
  Ethereum,
  EthereumEvent,
  EthereumMethod,
  EthereumWindow,
};
