import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { gql, useMutation } from '@apollo/client'

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($recipeId: ID!){
    deleteRecipe(recipeId: $recipeId){
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

const RecipeDeleteConfirmationDialog = ({recipe}) => {
  const [deleteRecipe, {loading, data, error}] = useMutation(DELETE_RECIPE);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  const handleClickConfirm = () => {
    deleteRecipe({variables:{recipeId:recipe.id}})
    setOpen(false);
  }

  return (
    <>
    <IconButton onClick={handleClickOpen} size='small' style={{marginRight:'8px'}}><DeleteIcon fontSize='small'/></IconButton>
    <Dialog
      open={open}
      onClose={handleClickClose}
    >
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete ${recipe.name ?? `this recipe`}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color='primary'>
          No, Cancel
        </Button>
        <Button onClick={handleClickConfirm} color='primary'>
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default RecipeDeleteConfirmationDialog;
