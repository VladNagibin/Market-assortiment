import React from 'react'
import Category from './Category'
export default function Categories({ categories, clickCategory,openChild,parent }) {
  
  return (
    <ul className='hr'>
      {categories.map(category => {
        return (<li key={category.Id}>
            <Category key={category.Id} 
            clickCategory={clickCategory} 
            category={category}
            openChild = {openChild} 
            parent={parent}/> 
            </li>)
      })}
      
    </ul>
      
  )
}
