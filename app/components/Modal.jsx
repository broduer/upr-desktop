// @flow
import React, { Component } from 'react';
import styles from './Modal.css';
import NavBar from '../containers/NavBar';

type Props = {
  title: string,
  children: React.Children
};

export default class Modal extends Component<Props> {
  props: Props;

  render() {
    const {
      props: { title, children }
    } = this;
    return (
      <div className={styles.container} data-tid="container">
        <NavBar title={title} />
        {children}
      </div>
    );
  }
}
