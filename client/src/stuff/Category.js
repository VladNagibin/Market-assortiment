import React from 'react'

export default function Category({category,clickCategory}) {
  function OpenCaterogy(){
      clickCategory(category.Id)
  }
  
    return (
    <div>
        <label>{category.name}</label>
        <button onClick={OpenCaterogy}>Открыть категорию</button>
    </div>
  )
}
