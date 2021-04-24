/**
 *
 * AddNoteCard
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import PinIcon from '../../Images/pin.svg';
import ArchiveIcon from '../../Images/archive.svg';
import { colors, fonts, media, styles } from '../../themes';

const Card = styled.div`
  width: 40%;
  margin: 2rem 0;
  padding: 0rem 0.5rem;
  cursor: pointer;
  display: flex;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  border-width: 1px 1px 1px 6px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  ${media.largeDesktop.max(`
    width: 75%;
  `)}
`;
const TitleInput = styled.span`
  border: none;
  width: 100%;
  resize: none;
  display: block;
  overflow: hidden;
  margin: 0.75rem 0;
  ${fonts.size.regular()}
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};
  &:focus {
    outline: none;
  }
`;
const NoteInput = styled.textarea`
  resize: none;
  border: none;
  margin: 0.75rem 0;
  &:focus {
    outline: none;
  }
  ${fonts.size.xRegular()}
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};
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
    background-color: ${colors.accentDefault};
  }
`;
function AddNoteCard({ toggleCard, addNote }) {
  const textInputEl = useRef(null);
  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
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
