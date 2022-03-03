import React, { useState } from 'react'
import Category from './Category'
export default function Categories({ categories, clickCategory }) {
  const [childCategories, updateChildCategories] = useState([])
  let currElement = null
  
  function getChildCategories(e) {
    
    if(e.target.tagName == 'DIV'){
      console.log(e.target.id)
    }
  }
  function destroyChildCategories(e) {

  }
  
  return (
    categories.map(category => {
      return (<> <div onMouseEnter={getChildCategories} onMouseLeave={destroyChildCategories}><Category key={category.Id} clickCategory={clickCategory} category={category} /> </div></>)
    })       
  )
}
