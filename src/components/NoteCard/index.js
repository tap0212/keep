/**
 *
 * NoteCard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, styles } from '../../themes';
import DeleteSvg from '../../Images/delete.svg';
import ArchiveSvg from '../../Images/archive.svg';
import unArchiveSvg from '../../Images/unArchive.svg';

const DeleteIcon = styled.img`
  width: 1.25rem;
  display: none;
`;
const ArchiveIcon = styled.img`
  width: 1.5rem;
  display: none;
`;
const Wrapper = styled.div`
  border: 1px solid ${colors.off2};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  min-height: 6rem;
  width: 14rem;
  transition: width 0.25s, height 0.25s, border-width 0.25s, box-shadow 0.25s;
  padding-bottom: 2rem;
  &:hover {
    border-width: 1px 1px 1px 1px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
  &:hover ${DeleteIcon} {
    display: block;
  }
  &:hover ${ArchiveIcon} {
    display: block;
  }
  position: relative;
`;
const Title = styled.p`
  word-wrap: break-word;
  width: 90%;
  ${fonts.size.big()}
`;
const Description = styled.p`
  word-wrap: break-word;
  width: 90%;
`;
const ToolRow = styled.div`
  position: absolute;
  padding: 0.5rem;
  bottom: 0;
  left: 0;
`;
const Row = styled.div`
  ${styles.configureFlex('row', 'space-between', 'flex-start')}
`;
function NoteCard({ note, deleteNote, archiveNote }) {
  return (
    <Wrapper>
      <Row>
        <Title>{note.title}</Title>
        <DeleteIcon
          onClick={() => {
            deleteNote(note.id);
          }}
          src={DeleteSvg}
        />
      </Row>
      <Description>{note.note}</Description>
      <ToolRow>
        <ArchiveIcon
          onClick={() => {
            archiveNote(note.id);
          }}
          src={note.isArchived ? unArchiveSvg : ArchiveSvg}
        />
      </ToolRow>
    </Wrapper>
  );
}

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
  archiveNote: PropTypes.func.isRequired
};

export default memo(NoteCard);
