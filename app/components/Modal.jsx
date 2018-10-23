// @flow
import React, { Component } from 'react';
import styles from './Modal.css';
import NavBar from '../containers/NavBar';

type Props = {
  title: string,
  children: React.Children
};

type State = {
  presenting: boolean
};

export default class Modal extends Component<Props, State> {
  state = { presenting: true };

  close() {
    this.setState({
      presenting: false
    });
  }

  render() {
    const {
      props: { title, children },
      state: { presenting }
    } = this;
    if (!presenting) {
      return null;
    }
    return (
      <div className={styles.container} data-tid="container">
        <NavBar
          title={title}
          hasCloseButton
          closeDelegate={() => {
            this.close();
          }}
        />
        <div className={styles.bodyContainer}>{children}</div>
      </div>
    );
  }
}
