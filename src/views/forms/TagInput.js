import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import TagCreateModal from './TagCreateModal';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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

const filter = createFilterOptions();

const TagInput = ({recipeId, tags, onChange, onInsertTag}) => {
  const [open, toggleOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {loading, data} = useQuery(TAGS);
  let sortedTags = _.sortBy(data?.tags, (tag) => { return tag.kind });
  return(
    <>
    <Autocomplete
      id="tags-combo-box"
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            text: `Add "${params.inputValue}"`,
            openDialog: true
          })
        }
        return filtered;
      }}
      options={sortedTags ?? []}
      getOptionLabel={(option) => {
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.text;
      }}
      renderOption={(option) => option.text}
      style={{ width: 300 }}
      onChange={(event, newValue) => {
        if (newValue[newValue.length - 1]?.openDialog){
          setInputValue(newValue[newValue.length-1].inputValue)
          toggleOpen(true);
        } else if (newValue && newValue.inputValue){
          setInputValue(newValue.inputValue);
          toggleOpen(true);
        } else {
          onChange(newValue);
        }
      }}
      loading={loading}
      value={tags}
      freeSolo
      multiple
      autoSelect
      autoHighlight
      groupBy={(option) => option.kind}
      renderInput={
        (params) => <TextField {...params} label="Tags" variant="outlined" />
      }
      />
    <TagCreateModal
      onClose={()=>{toggleOpen(false)}}
      onInsertTag={onInsertTag}
      initialText={inputValue}
      open={open}
      />
    </>
  )
}

export default TagInput;
