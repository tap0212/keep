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
import makeSelectArchivesContainer, { selectNotes } from './selectors';
import NoteCard from '../../components/NoteCard';
import { media } from '../../themes';
import { appCreators } from '../app/reducer';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const NotesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  ${media.largeMobile.max(`
    justify-content: center;
  `)}
`;
export function ArchivesContainer({
  notes,
  dispatchDeleteNote,
  dispatchUnArchiveNote
}) {
  return (
    <Wrapper>
      <NotesWrapper>
        {notes &&
          Object.values(notes).map(
            (note, i) =>
              note.isArchived && (
                <NoteCard
                  archiveNote={dispatchUnArchiveNote}
                  deleteNote={dispatchDeleteNote}
                  key={i}
                  note={note}
                />
              )
          )}
      </NotesWrapper>
    </Wrapper>
  );
}

ArchivesContainer.propTypes = {
  notes: PropTypes.object,
  dispatchDeleteNote: PropTypes.func,
  dispatchUnArchiveNote: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  archivesContainer: makeSelectArchivesContainer(),
  notes: selectNotes()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteNote: (noteId) => dispatch(appCreators.deleteNote(noteId)),
    dispatchUnArchiveNote: (noteId) =>
      dispatch(appCreators.unArchiveNote(noteId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ArchivesContainer);
