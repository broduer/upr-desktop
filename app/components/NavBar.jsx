// @flow
import React, { Component } from 'react';
import styles from './NavBar.css';

type Props = {
  title?: string,
  hasBackButton?: boolean,
  hasCloseButton?: boolean,
  closeDelegate?: () => void,
  history: {
    push: (a: *, b: *) => *
  }
};

export default class NavBar extends Component<Props> {
  props: Props;

  static defaultProps = {
    title: '',
    hasBackButton: false,
    hasCloseButton: false,
    closeDelegate: () => {}
  };

  goBack() {
    const {
      props: { history }
    } = this;
    history.push('/');
  }

  leftButton() {
    const { hasBackButton } = this.props;
    if (!hasBackButton) {
      return;
    }
    return (
      <div className={styles.backButton} data-tid="backButton">
        <button
          type="button"
          onClick={() => {
            this.goBack();
          }}
        >
          <i className="fa fa-angle-left fa-3x" />
          <span>Back</span>
        </button>
      </div>
    );
  }

  rightButton() {
    const { hasCloseButton, closeDelegate } = this.props;
    if (!hasCloseButton) {
      return;
    }
    return (
      <div className={styles.closeButton} data-tid="backButton">
        <button type="button" onClick={closeDelegate}>
          <i className="fa fa-times fa-3x" />
        </button>
      </div>
    );
  }

  render() {
    const {
      props: { title }
    } = this;
    return (
      <div className={styles.navBar}>
        {this.leftButton()}
        {this.rightButton()}
        <p>{title}</p>
      </div>
    );
  }
}
