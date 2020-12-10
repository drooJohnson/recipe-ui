import * as yup from 'yup';
import ingredient from './ingredient'
import tag from './tag'
import step from './step'

let schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(),
  description: yup.string(),
  ingredients: yup.array().of(ingredient),
  tags: yup.array().of(tag),
  steps: yup.array().of(step)
})

export default schema;
