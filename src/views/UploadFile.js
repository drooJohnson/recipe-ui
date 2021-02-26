import React, {useRef, useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import S3 from 'react-aws-s3';

/*const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;*/

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

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: "us-east-1",//region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  s3Url: `https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_REGION}.amazonaws.com`
};

const UploadFile = ({onSuccess, onFailure, imageUrl, alt}) => {
  const htmlInput = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(imageUrl ?? null);

  useEffect(()=>{
    if (file){
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileUrl(imageUrl ?? null);
    }
  },[file, imageUrl]);

  const handleClick = event => {
    htmlInput.current.click();
  }

  //const [mutate] = useMutation(SINGLE_UPLOAD);

  const onChange = (
    {target: {validity, files: [file] }}
  ) => {
    if (validity.valid){
      setFile(file);
      let newFileName = file.name;
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        console.log(data);
        if (data.status === 204) {
          onSuccess(data.location);
        } else {
          console.log("Failed");
        }
      }).catch(err => onFailure(err));
      /*mutate({ variables: { file } }).then((res) => {
        let {encoding, filename, mimetype, url} = res?.data?.singleUpload;
        onSuccess && onSuccess({encoding, filename, mimetype, url})
      }).catch((err) => {
        onFailure && onFailure(err);
      })*/
    }
  }

  
  if (file || fileUrl) {return(
    <Paper
      onClick={handleClick}
      style={{width:'100%', minHeight:'120px'}}
    >
      <UploadFileWrapper>
        <ImagePreview>
          <img alt={alt} src={fileUrl || imageUrl} style={{maxHeight:240,maxWidth:240}}/>
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
    return (
      <Paper
        onClick={handleClick}
        style={{ width: "100%", minHeight: "120px" }}
      >
        <UploadFileWrapper>
          <Typography variant="body1" style={{ marginBottom: 8, marginTop: 8 }}>
            No Image Selected...
          </Typography>
          <Button
            startIcon={<BackupIcon />}
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
          style={{ display: "none" }}
        />
      </Paper>
    );
  }
};

export default UploadFile;
