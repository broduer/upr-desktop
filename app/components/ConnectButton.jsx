// @flow
import React, { Component } from 'react';
import * as Sentry from '@sentry/electron';
import UPRKit from '../UPRKit';
import Button from './Button';

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
  constructor(props) {
    super(props);
    this.joinSession = this.joinSession.bind(this);
  }

  async joinSession() {
    const {
      props: {
        token,
        history,
        actions: { holdForActions, tokenActions }
      }
    } = this;
    const status = await UPRKit.Session.joinSession(token).catch(e => {
      dialog.showErrorBox(
        'Whoops!',
        `There was an error connecting to UPR - (${e.message})`
      );
      Sentry.captureException(e);
    });
    if (!status) return;
    if (status.data > 0) {
      holdForActions.setHoldFor(status.data.toString());
      history.push('/present');
    } else {
      console.warn(status);
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

    return (
      <Button
        active={!token.includes('_')}
        title={token.includes('_') ? 'Enter a token...' : 'Start Presenting'}
        onClick={this.joinSession}
      />
    );
  }
}
