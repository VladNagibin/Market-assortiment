import React, { useState } from 'react'
import Category from './Category'
export default function Categories({ categories, clickCategory,openChild }) {
  
  return (
    <ol>
      {categories.map(category => {
        return (<li>
            <Category key={category.Id} 
            clickCategory={clickCategory} 
            category={category}
            openChild = {openChild} /> 
            </li>)
      })}
      
    </ol>
      
  )
}
