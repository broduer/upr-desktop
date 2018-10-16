// @flow
import React, { Component } from 'react';
import styles from './Login.css';
import TokenForm from '../containers/TokenForm';
import ConnectButton from '../containers/ConnectButton';
import Logo from '../images/icon.png';
import Banner from '../images/banner.png';
import Modal from './Modal';

type Props = {
  token: string
};

export default class Login extends Component<Props> {
  props: Props;

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
        <Modal title="Welcome to UPR">
          <div>
            <h1>Hello world</h1>
          </div>
        </Modal>
      </div>
    );
  }
}
