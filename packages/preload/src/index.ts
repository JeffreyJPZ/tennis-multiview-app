import {sha256sum} from './nodeCrypto.js';
import {versions} from './versions.js';
import {ipcRenderer} from 'electron';
import {Channel} from './channels.js';

function invoke(channel: Channel, message?: string): Promise<any> {
  return ipcRenderer.invoke(channel, message);
}

export {sha256sum, versions, invoke, type Channel};
