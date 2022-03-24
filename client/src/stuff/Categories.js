import React from 'react'
import Category from './Category'
export default function Categories({ categories,openChild,parent }) {
  
  return (
    
      categories.map(category => {
        return (
            <Category key={category.Id} 
            category={category}
            openChild = {openChild} 
            parent={parent}/> 
            )
      })
      
    
      
  )
}
