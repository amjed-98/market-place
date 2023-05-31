const subdomain = process.env.NODE_ENV === 'production' ? '' : 'mumbai.';

const polygonscanTransactionsLink = `https://${subdomain}polygonscan.com/tx`;
const polygonscanAddressLink = `https://${subdomain}polygonscan.com/address`;

export { polygonscanTransactionsLink, polygonscanAddressLink };
