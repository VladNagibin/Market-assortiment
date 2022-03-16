import React from 'react'
import Category from './Category'
export default function Categories({ categories,openChild,parent }) {
  
  return (
    <ul className='hr'>
      {categories.map(category => {
        return (<li key={category.Id}>
            <Category key={category.Id} 
            category={category}
            openChild = {openChild} 
            parent={parent}/> 
            </li>)
      })}
      
    </ul>
      
  )
}
