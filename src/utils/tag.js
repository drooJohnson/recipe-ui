import * as yup from 'yup';

let schema = yup.object().shape({
  slug: yup.string().required(),
  text: yup.string().required(),
  kind: yup.string().oneOf([
    'SEASON',
    'CUISINE',
    'MEAL',
    'TECHNIQUE',
    'OCCASION',
    'BREADS',
    'FLAVOR',
    'SWEETS',
    'DIET',
    'INGREDIENT',
    'COMPONENT',
    'DEBUG'
  ]).required()
})

export default schema;
