import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import styles from './style.module.scss'

function LayoutMain({ children }) {
  return <Container className={styles.layoutMain}>{children}</Container>;
}

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(LayoutMain);
