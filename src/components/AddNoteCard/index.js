/**
 *
 * AddNoteCard
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, media, styles } from '../../themes';
import PinIcon from '../../Images/pin.svg';
import ArchiveIcon from '../../Images/archive.svg';
import { v4 as uuidv4 } from 'uuid';

const Card = styled.div`
  border: 1px solid ${colors.off1};
  width: 40%;
  margin: 2rem 0;
  padding: 0rem 0.5rem;
  color: ${colors.off3};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  border-radius: 0.5rem;
  border-width: 1px 1px 1px 6px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${media.largeDesktop.max(`
    width: 75%;
  `)}
`;
const TitleInput = styled.span`
  border: none;
  width: 100%;
  resize: none;
  color: black;
  display: block;
  overflow: hidden;
  margin: 0.75rem 0;
  ${fonts.size.regular()}
  &:focus {
    outline: none;
  }
`;
const NoteInput = styled.textarea`
  resize: none;
  border: none;
  margin: 0.75rem 0;
  ${fonts.size.xRegular()}
  &:focus {
    outline: none;
  }
`;
const Row = styled.div`
  ${styles.configureFlex('row', 'space-between')}
`;
const StyledIcon = styled.img`
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;
  width: 1.5rem;
  &:hover {
    background-color: ${colors.off1};
  }
`;
function AddNoteCard({ toggleCard, addNote }) {
  const textInputEl = useRef(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [isArchived, setIsArchived] = useState(false);
  const [toBePinned, setToBePinned] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      textInputEl.current.focus();
    }
  };
  const handleClose = () => {
    if (!title && !note) {
      toggleCard();
      return;
    }
    addNote({
      id: uuidv4(),
      title,
      note,
      isArchived,
      isPinned: toBePinned
    });
    toggleCard();
  };
  const handleArchive = () => {
    setIsArchived(true);
    if (title || note) {
      addNote({
        id: uuidv4(),
        title,
        note,
        isArchived: true,
        isPinned: toBePinned
      });
      toggleCard();
    }
  };
  const togglePin = () => {
    setToBePinned(!toBePinned);
  };
  return (
    <Card>
      <Row>
        <TitleInput
          className="textarea"
          onKeyDown={handleKeyDown}
          role="textbox"
          contentEditable
          onBlur={(e) => {
            setTitle(e.target.innerText);
          }}
        ></TitleInput>
        <StyledIcon onClick={togglePin} src={PinIcon} />
      </Row>

      <NoteInput
        ref={textInputEl}
        autoFocus
        rows="4"
        placeholder="Take a note..."
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
      <Row>
        <StyledIcon onClick={handleArchive} src={ArchiveIcon} />
        <p onClick={handleClose}>Close</p>
      </Row>
    </Card>
  );
}

AddNoteCard.propTypes = {
  toggleCard: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired
};

export default memo(AddNoteCard);
