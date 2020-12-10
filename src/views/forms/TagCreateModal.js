import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { useQuery, useMutation, gql } from '@apollo/client';

const TAG_KINDS = gql`
  query {
    __type(name: "TagKind") {
      name
      enumValues {
        name
      }
    }
  }
`

const INSERT_TAG = gql`
 mutation InsertTag(
   $tag: InsertTagInput!
 ) {
   insertTag(
     tag: $tag
   ) {
     id
     slug
     text
     kind
   }
 }
`

const TagCreateModal = ({onClose, onInsertTag, initialText, open}) => {

  const { loading, data } = useQuery(TAG_KINDS);

  let tagKinds = data?.__type.enumValues.map((value) => value.name) ?? [];

  const [ insertTag, { loading: insertLoading, error: insertError } ] = useMutation(INSERT_TAG);

  const [dialogValue, setDialogValue] = useState({
      text:initialText,
      slug:'',
      kind:''
  })

  useEffect(()=>{
    setDialogValue(d => ({ ...d, text: initialText }));
  },[initialText,open])

  const handleClose = () => {
    setDialogValue({
      text:'',
      slug:'',
      kind:''
    })
    onClose();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    insertTag({variables:{tag:dialogValue}})
      .then(res => {
        let newTag = {
          id: res.data.insertTag.id,
          kind: res.data.insertTag.kind,
          slug: res.data.insertTag.slug,
          text: res.data.insertTag.text
        };
        onInsertTag(newTag);
        onClose();
      })
      .catch(err => console.log(err));
  }

  const handleSelectChange = (event) => {
    setDialogValue({ ...dialogValue, kind: event.target.value});
  }

  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       <form onSubmit={handleSubmit}>
         <DialogTitle id="form-dialog-title">Add a new Tag</DialogTitle>
         <DialogContent>
          {insertError && <Alert severity="error">There was an error saving your tag.</Alert>}
          <DialogContentText>
             Need a new tag for your recipes? Add it below.
           </DialogContentText>
           <TextField
             autoFocus
             margin="dense"
             id="slug"
             value={dialogValue.slug}
             onChange={(event) => setDialogValue({ ...dialogValue, slug: event.target.value })}
             label="slug"
             type="text"
           />
           <TextField
             margin="dense"
             id="name"
             value={dialogValue.text}
             onChange={(event) => setDialogValue({ ...dialogValue, text: event.target.value })}
             label="name"
             type="text"
           />
           <InputLabel id="tag-kinds-select-label">Tag Kind</InputLabel>
           <Select
            labelId="tag-kinds-select-label"
            id="tag-kinds-select"
            loading={loading}
            value={dialogValue.kind ?? ''}
            onChange={handleSelectChange}
            >
            {tagKinds.map((kind) => (
              <MenuItem value={kind} key={kind}>{kind}</MenuItem>
            ))}
            </Select>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} color="primary">
             Cancel
           </Button>
           <Button disabledf={insertLoading} type="submit" color="primary">
             Add
           </Button>
         </DialogActions>
       </form>
     </Dialog>
   )
}

export default TagCreateModal;
