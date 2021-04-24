/**
 *
 * ImageUploader
 *
 */
import React, { memo, useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageUploadSvg from '../../Images/image.svg';
import { colors } from '../../themes';

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
});
const Cover = styled.div`
  display: inline;
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
const ImageUploader = ({ id, setImageData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  }, [selectedFile]);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const imageName = `${id}.${selectedFile?.name?.split('.').pop()}`;
  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: imageName
    };
    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setImageData({
          progress: Math.round((evt.loaded / evt.total) * 100),
          name: imageName
        });
      })
      .send((err) => {
        if (err) {
          console.log({ err });
        }
      });
  };

  return (
    <Cover>
      <label htmlFor="file-input">
        <StyledIcon src={ImageUploadSvg} />
      </label>
      <input
        style={{ display: 'none' }}
        onChange={handleFileInput}
        accept="image/x-png,image/gif,image/jpeg"
        id="file-input"
        type="file"
      />
    </Cover>
  );
};
ImageUploader.propTypes = {
  id: PropTypes.string.isRequired,
  setImageData: PropTypes.func.isRequired
};
export default memo(ImageUploader);
