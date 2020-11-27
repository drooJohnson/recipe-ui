import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as _ from 'lodash';

const TAGS = gql`
  query Tags {
    tags {
      id,
      slug,
      text,
      kind
    }
  }
`

const TagInput = ({tags, onChange}) => {
  const {loading, data, error} = useQuery(TAGS);

  let sortedTags = _.sortBy(data?.tags, (tag) => { return tag.kind });

  return(
    <Autocomplete
      id="tags-combo-box"
      options={sortedTags ?? []}
      getOptionLabel={(option) => option.text}
      style={{ width: 300 }}
      onChange={(event, value) => {onChange(value)}}
      loading={loading}
      value={tags}
      multiple
      autoSelect
      autoHighlight
      groupBy={(option) => option.kind}
      renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
      />
  )
}

export default TagInput;
