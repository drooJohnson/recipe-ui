import * as yup from 'yup';

let schema = yup.object().shape({
  displayOrder: yup.number().integer(),
  quantity: yup.string().required(),
  unit: yup.string(),
  name: yup.string().required()
})

export default schema;
