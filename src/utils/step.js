import * as yup from 'yup';

let schema = yup.object().shape({
  displayOrder: yup.number().integer(),
  title: yup.string(),
  text: yup.string().required()
})

export default schema;
