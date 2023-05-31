export default function formatHash(hash: string) {
  return `${hash.slice(0, 5)}...${hash.slice(-5)}`;
}
