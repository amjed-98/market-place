import { type EthereumWindow } from '../../@types/api';

function checkMetaMaskExtension(window: Window): window is EthereumWindow {
  return Object.prototype.hasOwnProperty.call(window, 'ethereum');
}

export default checkMetaMaskExtension;
