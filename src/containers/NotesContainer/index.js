/**
 *
 * NotesContainer
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectNotesContainer, {
  selectNotes,
  selectSelectedNote
} from './selectors';
import { colors, fonts, media } from '../../themes';
import AddNoteTile from '../../components/AddNoteTile';
import OutlineBulbImg from '../../Images/bulb-outlined.svg';
import AddNoteCard from '../../components/AddNoteCard';
import NoteCard from '../../components/NoteCard';
import { appCreators } from '../app/reducer';
import Modal from '../../components/Modal';
import Overlay from '../../components/Overlay';
import { notesContainerCreators } from './reducer';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const BulbIcon = styled.img`
  width: 60%;
`;
const NoNotesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10% 0;
`;
const StyledDefaultText = styled.p`
  color: ${colors.off2};
  ${fonts.size.big()}
  ${fonts.weights.normal()}
`;
const NotesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.largeMobile.max(`
    justify-content: center;
  `)}
`;

export function NotesContainer({
  dispatchAddNote,
  notes,
  dispatchDeleteNote,
  dispatchArchiveNote,
  dispatchSetSelectedNote,
  selectedNote,
  dispatchUpdateNote
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper>
      {isExpanded ? (
        <AddNoteCard addNote={dispatchAddNote} toggleCard={toggleCard} />
      ) : (
        <AddNoteTile setIsExpanded={setIsExpanded} />
      )}

      {!isExpanded && !notes && (
        <NoNotesWrapper>
          <BulbIcon src={OutlineBulbImg} />
          <StyledDefaultText>Notes you add appear here.</StyledDefaultText>
        </NoNotesWrapper>
      )}
      <NotesWrapper>
        {notes &&
          Object.values(notes).map(
            (note, i) =>
              !note.isArchived && (
                <NoteCard
                  updateNote={dispatchUpdateNote}
                  selectNote={dispatchSetSelectedNote}
                  archiveNote={dispatchArchiveNote}
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
            archiveNote={dispatchArchiveNote}
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

NotesContainer.propTypes = {
  dispatchAddNote: PropTypes.func,
  notes: PropTypes.object,
  dispatchDeleteNote: PropTypes.func,
  dispatchArchiveNote: PropTypes.func,
  dispatchSetSelectedNote: PropTypes.func,
  selectedNote: PropTypes.object,
  dispatchUpdateNote: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  notesContainer: makeSelectNotesContainer(),
  notes: selectNotes(),
  selectedNote: selectSelectedNote()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddNote: (note) => dispatch(appCreators.addNote(note)),
    dispatchDeleteNote: (noteId) => dispatch(appCreators.deleteNote(noteId)),
    dispatchArchiveNote: (noteId) => dispatch(appCreators.archiveNote(noteId)),
    dispatchSetSelectedNote: (note) =>
      dispatch(notesContainerCreators.setOpenedNote(note)),
    dispatchUpdateNote: (note) => dispatch(appCreators.updateNote(note))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NotesContainer);
