// @flow
import React, { Component } from 'react';
import SendKeys from 'send-keys-native';
import styles from './Login.css';
import TokenForm from '../containers/TokenForm';
import ConnectButton from '../containers/ConnectButton';
import Logo from '../images/icon.png';
import Banner from '../images/banner.png';
import Modal from './Modal';

const { dialog } = require('electron').remote;

type Props = {
  token: string
};

type State = {
  hasPermissions: boolean
};

export default class Login extends Component<Props, State> {
  state = { hasPermissions: true };

  componentDidMount() {
    this.checkPermissions();
  }

  initialPermissionCheck = true;

  checkPermissions() {
    SendKeys.hasPermissions()
      .then(v => {
        if (!this.initialPermissionCheck && !v) {
          dialog.showErrorBox(
            'Whoops!',
            `UPR is still missing the required permissions. Please try again, or restart UPR Desktop.`
          );
        }
        this.initialPermissionCheck = false;
        return this.setState({ hasPermissions: v });
      })
      .catch(e => {
        console.error(e);
      });
  }

  macPermissionWarning() {
    const {
      state: { hasPermissions }
    } = this;
    if (hasPermissions) {
      return null;
    }
    return (
      <Modal
        title="Welcome to UPR"
        buttonTitle="Check Permissions"
        buttonActive
        buttonOnClick={() => {
          this.checkPermissions();
        }}
      >
        <div>
          <h1>Review Permissions</h1>
          <p>
            In order for UPR to control your presentations, it needs permission
            to and Application called System Events.
          </p>
          <p>
            To allow this, open System Preferences then select Security &
            Privacy. Make sure UPR is checked in the Automation tab.
          </p>
        </div>
      </Modal>
    );
  }

  render() {
    const {
      props: { token }
    } = this;
    return (
      <div className={styles.container} data-tid="container">
        <img src={Logo} alt="Logo" className={styles.logo} />
        <br />
        <img src={Banner} alt="Banner" className={styles.banner} />
        <h2>Universal Presenter Remote</h2>
        <TokenForm />
        <ConnectButton token={token} />
        {this.macPermissionWarning()}
      </div>
    );
  }
}
