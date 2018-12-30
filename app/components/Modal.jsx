// @flow
import React, { Component } from 'react';
import styles from './Modal.css';
import NavBar from '../containers/NavBar';
import Button from './Button';

type Props = {
  title: string,
  children: React.Children,
  buttonTitle: string,
  buttonOnClick: () => void,
  buttonActive: boolean,
  canClose: ?boolean
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
      props: {
        title,
        children,
        buttonTitle,
        buttonOnClick,
        buttonActive,
        canClose
      },
      state: { presenting }
    } = this;
    if (!presenting) {
      return null;
    }
    return (
      <div className={styles.container} data-tid="container">
        <NavBar
          title={title}
          hasCloseButton={canClose}
          closeDelegate={() => {
            this.close();
          }}
        />
        <div className={styles.bodyContainer}>{children}</div>
        <Button
          title={buttonTitle}
          onClick={buttonOnClick}
          active={buttonActive}
        />
      </div>
    );
  }
}
