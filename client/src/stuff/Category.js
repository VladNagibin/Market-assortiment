import React from 'react'

export default function Category({ category, clickCategory, openChild }) {

  function OpenCaterogy() {
    clickCategory(category.Id, category.name)
  }
  function getChildCategories(){
    try{
      openChild(category.Id)
    }catch{
      console.log(category.Id)
    }
    
  }
  function destroyChildCategories(){
    openChild(null)
  }


  return (
    <div id={category.Id} onMouseEnter={getChildCategories} onMouseLeave={destroyChildCategories}>
      <label>
        <a onClick={OpenCaterogy} >{category.name}</a>
      </label>
    </div>
  )
}
