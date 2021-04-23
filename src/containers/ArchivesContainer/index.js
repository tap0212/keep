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
import makeSelectArchivesContainer, {
  selectNotes,
  selectSelectedNote
} from './selectors';
import NoteCard from '../../components/NoteCard';
import { colors, media } from '../../themes';
import { appCreators } from '../app/reducer';
import { archivesContainerCreators } from './reducer';
import Modal from '../../components/Modal';
import Overlay from '../../components/Overlay';

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
  selectedNote,
  dispatchDeleteNote,
  dispatchUnArchiveNote,
  dispatchUpdateNote,
  dispatchSetSelectedNote
}) {
  return (
    <Wrapper>
      <NotesWrapper>
        {notes &&
          Object.values(notes).map(
            (note, i) =>
              note.isArchived && (
                <NoteCard
                  selectNote={dispatchSetSelectedNote}
                  updateNote={dispatchUpdateNote}
                  archiveNote={dispatchUnArchiveNote}
                  deleteNote={dispatchDeleteNote}
                  key={i}
                  note={note}
                />
              )
          )}
      </NotesWrapper>
      {selectedNote && (
        <>
          <Modal
            update={dispatchUpdateNote}
            archiveNote={dispatchUnArchiveNote}
            close={() => {
              dispatchSetSelectedNote(null);
            }}
            note={selectedNote}
          />
          <Overlay
            color={colors.backDrop}
            close={() => {
              dispatchSetSelectedNote(null);
            }}
          />
        </>
      )}
    </Wrapper>
  );
}

ArchivesContainer.propTypes = {
  notes: PropTypes.object,
  dispatchDeleteNote: PropTypes.func,
  dispatchUnArchiveNote: PropTypes.func,
  dispatchUpdateNote: PropTypes.func,
  dispatchSetSelectedNote: PropTypes.func,
  selectedNote: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  archivesContainer: makeSelectArchivesContainer(),
  notes: selectNotes(),
  selectedNote: selectSelectedNote()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteNote: (noteId) => dispatch(appCreators.deleteNote(noteId)),
    dispatchUnArchiveNote: (noteId) =>
      dispatch(appCreators.unArchiveNote(noteId)),
    dispatchUpdateNote: (note) => dispatch(appCreators.updateNote(note)),
    dispatchSetSelectedNote: (note) =>
      dispatch(archivesContainerCreators.setOpenedNote(note))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ArchivesContainer);
