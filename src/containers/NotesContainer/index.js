/**
 *
 * NotesContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectNotesContainer from './selectors';

export function NotesContainer() {
  return (
    <div>
      <h1>Notes</h1>
    </div>
  );
}

NotesContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  notesContainer: makeSelectNotesContainer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NotesContainer);
