import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import UploadFile from '../UploadFile'

import { useQuery, useMutation, gql } from '@apollo/client';

import PropTypes from 'prop-types';
import TagInput from './TagInput'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const TagForm = ({onSubmit, loading, error, tag}) => {
  // State
  const [slug, setSlug] = useState(tag.slug);
  const [text, setText] = useState(tag.text);
  const [imageUrl, setImageUrl] = useState(tag.imageUrl);
  const [kind, setKind] = useState(tag.kind);

  // Get possible tag kinds
  const { loading: kindsLoading, data: kindsData } = useQuery(TAG_KINDS);

  let tagKinds = kindsData?.__type.enumValues.map((value) => value.name) ?? [];

  const handleSubmit = (event) => {
    onSubmit({
      ...tag.id && { id: tag.id },
      ...{slug},
      ...{text},
      ...{imageUrl},
      ...{kind}
    })
  }

  const handleSelectChange = (event) => {
    setKind(event.target.value);
  }

  return(
    <form noValidate autoComplete='off'>
      <Grid container spacing={2} style={{marginBottom:'24px'}}>
        {error &&
          <Grid item xs={12}>
            <Alert severity="error">There was an error saving your tag.</Alert>
          </Grid>
        }
        <Grid item xs={12}>
          <TextField
            id="tag-slug"
            label="Slug"
            variant='outlined'
            value={slug ?? ''}
            fullWidth
            onChange={(event) => {
              setSlug(event.target.value)
            }}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tag-text"
            label="Text"
            variant='outlined'
            value={text ?? ''}
            multiline
            fullWidth
            onChange={(event) => {
              setText(event.target.value)
            }}
            />
        </Grid>
        <Grid item xs={12}>
          {tag.imageUrl ? <img src={tag.imageUrl}/> : <UploadFile
            onSuccess={({encoding, filename, mimetype, url})=>{
              setImageUrl(url);
            }}
            />}
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="tag-kinds-select-label">Tag Kind</InputLabel>
          <Select
           labelId="tag-kinds-select-label"
           id="tag-kinds-select"
           loading={kindsLoading}
           value={kind ?? ''}
           onChange={handleSelectChange}
           >
           {tagKinds.map((kind) => (
             <MenuItem value={kind} key={kind}>{kind}</MenuItem>
           ))}
           </Select>
         </Grid>
      </Grid>
      <Button type='button' onClick={handleSubmit}>SUBMIT</Button>
    </form>
   )
}

TagForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  tag: PropTypes.object
}

TagForm.defaultProps = {
  tag: {
    id: '',
    slug: '',
    text: '',
    imageUrl: '',
    kind: null
  }
}

export default TagForm;
