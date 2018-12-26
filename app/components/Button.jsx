// @flow
import React, { Component } from 'react';
import styles from './Button.css';

type Props = {
  active: boolean,
  title: string,
  onClick: () => void
};

export default class Button extends Component<Props> {
  render() {
    const {
      props: { active, title, onClick }
    } = this;

    const buttonStyles = [styles.button];
    if (active) buttonStyles.push([styles.active]);

    return (
      <div className={buttonStyles.join(' ')}>
        <button
          type="button"
          onClick={() => {
            if (active) {
              onClick();
            }
          }}
        >
          {title}
        </button>
      </div>
    );
  }
}
