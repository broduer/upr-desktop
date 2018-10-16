// @flow
import React, { Component } from 'react';
import * as Sentry from '@sentry/electron';
import UPRKit from '../UPRKit';
import styles from './ConnectButton.css';

const { dialog } = require('electron').remote;

type Props = {
  token: string,
  history: {
    push: (a: *, b: *) => *
  },
  actions: {
    tokenActions: {
      resetToken: () => void
    },
    holdForActions: {
      setHoldFor: string => void
    }
  }
};

export default class ConnectButton extends Component<Props> {
  props: Props;

  async joinSession(event) {
    const {
      props: {
        token,
        history,
        actions: { holdForActions, tokenActions }
      }
    } = this;
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = 'Joining...';
    const status = await UPRKit.Session.joinSession(token).catch(e => {
      dialog.showErrorBox(
        'Whoops!',
        `There was an error connecting to UPR - (${e.message})`
      );
      Sentry.captureException(e);
    });
    if (!status) return;
    if (status.data > 0) {
      button.innerHTML = originalText;
      holdForActions.setHoldFor(status.data.toString());
      history.push('/present');
    } else {
      console.warn(status);
      button.innerHTML = originalText;
      dialog.showErrorBox(
        'Whoops!',
        'The token you entered does not appear to be valid.'
      );
      tokenActions.resetToken();
    }
  }

  render() {
    const {
      props: { token }
    } = this;
    if (token.includes('_')) {
      return (
        <div className={[styles.connectButton].join(' ')}>
          <button type="button">Enter a token...</button>
        </div>
      );
    }

    return (
      <div className={[styles.connectButton, styles.active].join(' ')}>
        <button
          type="button"
          onClick={e => {
            this.joinSession(e);
          }}
        >
          Start Presenting
        </button>
      </div>
    );
  }
}
