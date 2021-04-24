/**
 *
 * ArchivesContainer
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectArchivesContainer, {
  selectNotes,
  selectSearchedNotes,
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
export function ArchivesContainer({
  notes,
  selectedNote,
  searchResults,
  dispatchUpdateNote,
  dispatchDeleteNote,
  dispatchSetSelectedNote,
  dispatchDeleteSearchedNote,
  dispatchUpdateSearchedNote
}) {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <Wrapper>
      <NotesWrapper>
        {!searchResults.searchQuery ? (
          <>
            {notes &&
              Object.values(notes).map(
                (note, i) =>
                  note.isArchived && (
                    <NoteCard
                      selectNote={dispatchSetSelectedNote}
                      updateNote={dispatchUpdateNote}
                      deleteNote={dispatchDeleteNote}
                      key={i}
                      note={note}
                    />
                  )
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

ArchivesContainer.propTypes = {
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
  archivesContainer: makeSelectArchivesContainer(),
  notes: selectNotes(),
  selectedNote: selectSelectedNote(),
  searchResults: selectSearchedNotes()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteNote: (noteId) => dispatch(appCreators.deleteNote(noteId)),
    dispatchUpdateNote: (note) => dispatch(appCreators.updateNote(note)),
    dispatchSetSelectedNote: (note) =>
      dispatch(archivesContainerCreators.setOpenedNote(note)),
    dispatchDeleteSearchedNote: (data) =>
      dispatch(appCreators.deleteSearchedNote(data)),
    dispatchUpdateSearchedNote: (data) =>
      dispatch(appCreators.updateSearchedNote(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ArchivesContainer);
