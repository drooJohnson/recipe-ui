import React, {useRef, useState, useEffect} from 'react';
import {gql, useMutation} from '@apollo/client';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

const UploadFileWrapper = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  justify-content:stretch;
  align-items:center;
  padding:16px;
`

const ImagePreview = styled.div`
  display:flex;
  flex-grow:1;
  justify-content:center;
`
const ImageDetails = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin-left:24px;
  flex-grow:1;
`
const DeleteButton = styled.div`
  width:24px;
  height:24px;
  background-color:red;
  position:absolute;
  top:-12px;
  left:-12px;
`

const UploadFile = ({onSuccess, onFailure, imageUrl}) => {
  const htmlInput = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(imageUrl ?? null);

  useEffect(()=>{
    if (file){
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileUrl(imageUrl ?? null);
    }
  },[file]);

  const handleClick = event => {
    htmlInput.current.click();
  }

  const [mutate, { loading, data, error }] = useMutation(SINGLE_UPLOAD);

  const onSubmit = () => {
    mutate({ variables: { file } }).then((res) => {
      let {encoding, filename, mimetype, url} = res?.data?.singleUpload;
      onSuccess({encoding, filename, mimetype, url})
    })
  }

  const onChange = (
    {target: {validity, files: [file] }}
  ) => {
    if (validity.valid){
      setFile(file);
      mutate({ variables: { file } }).then((res) => {
        let {encoding, filename, mimetype, url} = res?.data?.singleUpload;
        onSuccess && onSuccess({encoding, filename, mimetype, url})
      }).catch((err) => {
        onFailure && onFailure(err);
      })
    }
  }

  if (file || fileUrl) {return(
    <Paper
      onClick={handleClick}
      style={{width:'100%', minHeight:'120px'}}
    >
      <UploadFileWrapper>
        <ImagePreview>
          <img src={fileUrl || imageUrl} style={{maxHeight:240,maxWidth:240}}/>
          {file && <ImageDetails>
            <Typography variant='body2' gutterBottom>{file.name}</Typography>
            <Typography variant='body2' gutterBottom>{file.size}</Typography>
          </ImageDetails>}
        </ImagePreview>
        <Button
          startIcon={<BackupIcon/>}
          color="primary"
          variant="contained"
        >
          Replace Image
        </Button>
      </UploadFileWrapper>
      <input
        type="file"
        required
        ref={htmlInput}
        onChange={onChange}
        style={{display: 'none'}}
      />
    </Paper>
  )
  } else {
    return(
      <Paper
        onClick={handleClick}
        style={{width:'100%', minHeight:'120px'}}
      >
        <UploadFileWrapper>
          <Typography variant='body1' style={{marginBottom:8,marginTop:8}}>No Image Selected...</Typography>
          <Button
            startIcon={<BackupIcon/>}
            color="primary"
            variant="contained"
          >
            Choose Image
          </Button>
        </UploadFileWrapper>
        <input
          type="file"
          required
          ref={htmlInput}
          onChange={onChange}
          style={{display: 'none'}}
        />
      </Paper>
    )
  }
};

export default UploadFile;
