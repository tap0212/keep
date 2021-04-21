/**
 *
 * ArchivesContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectArchivesContainer from './selectors';

const Wrapper = styled.div``;
export function ArchivesContainer() {
  return (
    <Wrapper>
      <h1>Archive</h1>
    </Wrapper>
  );
}

ArchivesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  archivesContainer: makeSelectArchivesContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ArchivesContainer);
