import React from 'react'

const LocationObjects = ({items}) => {
  return(
    <>
      {items.map(item => {
        return <div>{item.worldDescription}</div>
      })}
    </>
  )
}

export default LocationObjects;
