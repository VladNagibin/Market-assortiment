import React from 'react'
import Category from './Category'
export default function Categories({categories,clickCategory}) {
    return (
    categories.map(category=>{
        return(<> <div><Category key =  {category.Id} clickCategory = {clickCategory} category = {category}/> </div></>)
    })
  )
}
