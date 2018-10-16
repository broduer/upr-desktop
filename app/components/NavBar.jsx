// @flow
import React, { Component } from 'react';
import styles from './NavBar.css';

type Props = {
  title: string,
  hasBackButton: boolean,
  history: {
    push: (a: *, b: *) => *
  }
};

export default class NavBar extends Component<Props> {
  props: Props;

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
          onClick={e => {
            this.goBack(e);
          }}
        >
          <i className="fa fa-angle-left fa-3x" />
          <span>Back</span>
        </button>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.navBar}>
        {this.leftButton()}
        <p>{title}</p>
      </div>
    );
  }
}
