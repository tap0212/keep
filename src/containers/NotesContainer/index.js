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
  selectSelectedNote,
  selectSearchedNotes
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
  padding: 1rem;
  ${media.largeMobile.max(`
    padding: 0;
  `)}
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
  width: 100%;
  ${media.largeMobile.max(`
    justify-content: center;
  `)}
`;
const SectionWrapper = styled.div`
  width: 80%;
  text-align: left;
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}rem;`}
`;

export function NotesContainer({
  dispatchAddNote,
  notes,
  searchResults,
  dispatchDeleteNote,
  dispatchSetSelectedNote,
  selectedNote,
  dispatchUpdateNote,
  dispatchDeleteSearchedNote,
  dispatchUpdateSearchedNote
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Wrapper>
      {!searchResults.searchQuery && (
        <>
          {isExpanded ? (
            <AddNoteCard addNote={dispatchAddNote} toggleCard={toggleCard} />
          ) : (
            <AddNoteTile setIsExpanded={setIsExpanded} />
          )}
        </>
      )}

      {!isExpanded && !Object.keys(notes).length && (
        <NoNotesWrapper>
          <BulbIcon src={OutlineBulbImg} />
          <StyledDefaultText>Notes you add appear here.</StyledDefaultText>
        </NoNotesWrapper>
      )}
      <NotesWrapper>
        {!searchResults.searchQuery ? (
          <>
            {notes && (
              <Wrapper>
                <NotesWrapper>
                  {Object.values(notes)
                    .filter((note) => !note.isArchived && note.isPinned)
                    .map((note, i) => {
                      return (
                        <NoteCard
                          updateNote={dispatchUpdateNote}
                          selectNote={dispatchSetSelectedNote}
                          deleteNote={dispatchDeleteNote}
                          key={i}
                          note={note}
                        />
                      );
                    })}
                </NotesWrapper>

                <NotesWrapper>
                  {Object.values(notes)
                    .filter((note) => !note.isArchived && !note.isPinned)
                    .map((note, i) => (
                      <NoteCard
                        updateNote={dispatchUpdateNote}
                        selectNote={dispatchSetSelectedNote}
                        deleteNote={dispatchDeleteNote}
                        key={i}
                        note={note}
                      />
                    ))}
                </NotesWrapper>
              </Wrapper>
            )}
          </>
        ) : (
          <>
            {!!searchResults.searchResp.length && (
              <Wrapper>
                <NotesWrapper>
                  {searchResults.searchResp
                    .filter((note) => !note.isArchived)
                    .map((note, i) => (
                      <NoteCard
                        updateNote={dispatchUpdateSearchedNote}
                        selectNote={dispatchSetSelectedNote}
                        deleteNote={dispatchDeleteSearchedNote}
                        key={i}
                        note={note}
                      />
                    ))}
                </NotesWrapper>
                <SectionWrapper marginTop={2}>
                  {showArchive && (
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: colors.off3,
                        fontWeight: '500'
                      }}
                    >
                      Archive
                    </p>
                  )}
                </SectionWrapper>

                <NotesWrapper>
                  {searchResults.searchResp
                    .filter((note) => note.isArchived)
                    .map((note, i) => {
                      if (!showArchive) {
                        setShowArchive(true);
                      }
                      return (
                        <NoteCard
                          updateNote={dispatchUpdateSearchedNote}
                          selectNote={dispatchSetSelectedNote}
                          deleteNote={dispatchDeleteSearchedNote}
                          key={i}
                          note={note}
                        />
                      );
                    })}
                </NotesWrapper>
              </Wrapper>
            )}
          </>
        )}
      </NotesWrapper>
      {selectedNote && (
        <>
          <Modal
            update={
              searchResults.searchResp.length
                ? dispatchUpdateSearchedNote
                : dispatchUpdateNote
            }
            deleteNote={
              searchResults.searchResp.length
                ? dispatchDeleteSearchedNote
                : dispatchDeleteNote
            }
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
  dispatchSetSelectedNote: PropTypes.func,
  selectedNote: PropTypes.object,
  dispatchUpdateNote: PropTypes.func,
  searchResults: PropTypes.object,
  dispatchDeleteSearchedNote: PropTypes.func,
  dispatchUpdateSearchedNote: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  notesContainer: makeSelectNotesContainer(),
  notes: selectNotes(),
  selectedNote: selectSelectedNote(),
  searchResults: selectSearchedNotes()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddNote: (note) => dispatch(appCreators.addNote(note)),
    dispatchDeleteNote: (noteId) => dispatch(appCreators.deleteNote(noteId)),
    dispatchSetSelectedNote: (note) =>
      dispatch(notesContainerCreators.setOpenedNote(note)),
    dispatchUpdateNote: (note) => dispatch(appCreators.updateNote(note)),

    dispatchDeleteSearchedNote: (data) =>
      dispatch(appCreators.deleteSearchedNote(data)),
    dispatchUpdateSearchedNote: (data) =>
      dispatch(appCreators.updateSearchedNote(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NotesContainer);
