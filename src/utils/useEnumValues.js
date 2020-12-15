import React from 'react';
import { gql, useQuery } from '@apollo/client'

const GET_ENUM_VALUES = gql`
  query($enumName:String!) {
    __type(name: $enumName) {
      name
      enumValues {
        name
      }
    }
  }
`

export function useEnumValues(enumName) {
  const {loading, data, error} = useQuery(GET_ENUM_VALUES, {variables:{enumName:enumName}});
  let returnData = null;
  let enumValues = data?.__type.enumValues.map((value) => value.name) ?? [];

  return {loading, data: enumValues, error}
}
