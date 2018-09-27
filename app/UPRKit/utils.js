import SendKeys from 'send-keys-native';
import io from 'socket.io-client';
import _ from 'lodash';
import crypto from 'crypto';
import pub from './certificates/public.key';

export const SLIDE_UP = 'SlideUp';
export const SLIDE_DOWN = 'SlideDown';
export const PLAY_MEDIA = 'PlayMedia';

let socket;

type messageType = {
  action: string,
  holdfor: string,
  signature: string,
  timestamp: string
};

function listenForEvents(token: string, holdFor: string) {
  socket = io('https://universalpresenterremote.com');
  socket.on(token, (message: messageType) => {
    const validate: messageType = _.cloneDeep(message);
    delete validate.signature;
    const jsonMsg = JSON.stringify(validate);
    const verify = crypto.createVerify('SHA256');
    verify.write(jsonMsg);
    verify.end();
    const isValid = verify.verify(pub.key, message.signature, 'hex');
    if (isValid && message.holdfor === holdFor) {
      switch (message.action) {
        case SLIDE_UP: {
          SendKeys.rightArrow();
          break;
        }
        case SLIDE_DOWN: {
          SendKeys.leftArrow();
          break;
        }
        case PLAY_MEDIA: {
          SendKeys.rightArrow();
          break;
        }
        default:
          break;
      }
    }
  });
}

function disconnect() {
  if (socket) {
    socket.close();
    socket = undefined;
  }
}

export default {
  listenForEvents,
  disconnect
};
