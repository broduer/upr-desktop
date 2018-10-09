import SendKeys from 'send-keys-native';
import io from 'socket.io-client';
import _ from 'lodash';
import crypto from 'crypto';
import * as Sentry from '@sentry/electron';
import pub from './certificates/public.key';

export const SLIDE_UP = 'SlideUp';
export const SLIDE_DOWN = 'SlideDown';
export const PLAY_MEDIA = 'PlayMedia';

let socket;
let sigCematary = {};

type messageType = {
  action: string,
  holdfor: string,
  signature: string,
  timestamp: string
};

function listenForEvents(token: string, holdFor: string) {
  socket = io('https://universalpresenterremote.com');
  socket.on('error', e => {
    Sentry.captureException(e);
  });
  socket.on(token, (message: messageType) => {
    const validate: messageType = _.cloneDeep(message);
    delete validate.signature;
    const jsonMsg = JSON.stringify(validate);
    const verify = crypto.createVerify('SHA256');
    verify.write(jsonMsg);
    verify.end();
    const isValid = verify.verify(pub.key, message.signature, 'hex');
    if (
      isValid &&
      message.holdfor === holdFor &&
      !sigCematary[message.signature]
    ) {
      sigCematary[message.signature] = new Date();
      switch (message.action) {
        case SLIDE_UP: {
          SendKeys.rightArrow().catch(e => {
            Sentry.captureException(e);
          });
          break;
        }
        case SLIDE_DOWN: {
          SendKeys.leftArrow().catch(e => {
            Sentry.captureException(e);
          });
          break;
        }
        case PLAY_MEDIA: {
          SendKeys.rightArrow().catch(e => {
            Sentry.captureException(e);
          });
          break;
        }
        default:
          break;
      }
    } else {
      Sentry.captureException(new Error('Message signature mismatch.'));
    }
  });
}

function disconnect() {
  if (socket) {
    socket.close();
    socket = undefined;
    sigCematary = {};
  }
}

export default {
  listenForEvents,
  disconnect
};
