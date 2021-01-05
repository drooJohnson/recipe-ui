import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import { gql, useMutation } from '@apollo/client'

const RESTORE_RECIPE = gql`
  mutation RestoreRecipe($recipeId: ID!){
    restoreRecipe(recipeId: $recipeId){
      id,
      name,
      description,
      imageUrl,
      imageColor,
      imageAltText,
      ingredients,
      steps {
        id,
        displayOrder,
        title,
        text,
        type,
        imageUrl,
        side,
        color,
        altText
      },
      tags {
        id,
        slug,
        text,
        kind
      },
      status,
      createdAt,
      updatedAt,
      deletedAt,
    }
  }
`

const RecipeRestoreConfirmationDialog = ({recipe}) => {
  const [restoreRecipe, {loading, data, error}] = useMutation(RESTORE_RECIPE);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickConfirm = () => {
    restoreRecipe({variables:{recipeId:recipe.id}})
    setOpen(false);
  }

  return (
    <>
    <Tooltip title='Restore Recipe'><IconButton onClick={handleClickOpen} size='small' style={{marginRight:'8px'}}><RestoreFromTrashIcon fontSize='small'/></IconButton></Tooltip>
    <Dialog
      open={open}
      onClose={handleClickClose}
    >
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to restore ${recipe.name ?? `this recipe`}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color='primary'>
          No, Cancel
        </Button>
        <Button onClick={handleClickConfirm} color='primary'>
          Yes, Restore
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default RecipeRestoreConfirmationDialog;
