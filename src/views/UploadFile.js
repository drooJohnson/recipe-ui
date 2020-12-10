import React from 'react';
import {gql, useMutation} from '@apollo/client';

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

const UploadFile = ({onSuccess}) => {
  const [mutate, { loading, data, error }] = useMutation(SINGLE_UPLOAD);
  const onChange = (
    {target: {validity, files: [file] }}
  ) => {
    console.log(file);
    if (validity.valid){
      mutate({ variables: { file } }).then((res) => {
        let {encoding, filename, mimetype, url} = res?.data?.singleUpload;
        onSuccess({encoding, filename, mimetype, url})
      });
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  if (data) return <div>pic<img src={data.singleUpload.url}/></div>;
  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};

export default UploadFile;
