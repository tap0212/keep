/**
 *
 * Modal
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { colors, fonts, media, styles } from '../../themes';
import { indexes } from '../../themes/zIndex';
import PinIcon from '../../Images/pin.svg';
import ArchiveIcon from '../../Images/archive.svg';
import UnArchiveSvg from '../../Images/unArchive.svg';
import DeleteSvg from '../../Images/delete.svg';
import FilledPinSvg from '../../Images/filledPin.svg';

const Wrapper = styled.div`
  width: 40%;
  min-height: 20%;
  overflow: hidden;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${indexes.TOP};
  padding: 1rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  ${media.largeMobile.max(`
    width: 80%;
    min-height: 30%;
    left: 47.5%;
    top: 40%;
  `)}
`;
const Row = styled.div`
  ${styles.configureFlex('row', 'space-between')}
`;
const NoteInput = styled.textarea`
  resize: none;
  border: none;
  margin: 0.75rem 0;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.primary};
  ${fonts.size.xRegular()}
  &:focus {
    outline: none;
  }
`;
const TitleInput = styled.span`
  border: none;
  width: 100%;
  resize: none;
  color: black;
  display: block;
  overflow: hidden;
  margin: 0.75rem 0;
  color: ${(props) => props.theme.text};
  ${fonts.size.regular()}
  &:focus {
    outline: none;
  }
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
const CloseBtn = styled.p`
  cursor: pointer;
`;
function Modal({ note, close, update, deleteNote }) {
  const textInputEl = useRef(null);
  const titleInputEl = useRef(null);

  useEffect(() => {
    textInputEl.current.innerText = note.note;
    titleInputEl.current.innerText = note.title;
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      textInputEl.current.focus();
    }
  };
  const handlePinNote = () => {
    if (note.isArchived) {
      update({
        id: note.id,
        key: 'isArchived',
        value: !note.isArchived
      });
    }
    update({
      id: note.id,
      key: 'isPinned',
      value: !note.isPinned
    });
    close();
  };
  const onChangeNoteInput = (e) => {
    const debouncedUpdate = () => {
      update({
        id: note.id,
        key: 'note',
        value: e.target.value
      });
    };
    debounce(debouncedUpdate, 200)();
  };
  const handleNoteArchive = () => {
    if (note.isPinned) {
      update({
        id: note.id,
        key: 'isPinned',
        value: false
      });
    }
    update({
      id: note.id,
      key: 'isArchived',
      value: !note.isArchived
    });

    close();
  };
  return (
    <Wrapper>
      <Row>
        <TitleInput
          ref={titleInputEl}
          className="textarea"
          onKeyDown={handleKeyDown}
          role="textbox"
          contentEditable
          onBlur={(e) => {
            update({
              id: note.id,
              key: 'title',
              value: e.target.innerText
            });
          }}
        ></TitleInput>
        <StyledIcon
          onClick={handlePinNote}
          src={note.isPinned ? FilledPinSvg : PinIcon}
        />
      </Row>
      <NoteInput
        ref={textInputEl}
        autoFocus
        rows="4"
        placeholder="Take a note..."
        onBlur={onChangeNoteInput}
      />
      <Row>
        <div>
          <StyledIcon
            onClick={handleNoteArchive}
            src={note.isArchived ? UnArchiveSvg : ArchiveIcon}
          />
          <StyledIcon
            onClick={() => {
              deleteNote(note.id);
              close();
            }}
            src={DeleteSvg}
          />
        </div>
        <CloseBtn
          onClick={() => {
            // update
            close();
          }}
        >
          Close
        </CloseBtn>
      </Row>
    </Wrapper>
  );
}

Modal.propTypes = {
  note: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired
};

export default memo(Modal);
