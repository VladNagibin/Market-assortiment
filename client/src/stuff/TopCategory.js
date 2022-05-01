import React from 'react'
import { Link} from 'react-router-dom'

export default function TopCategory({category}) {
    return (
    <Link className='btn waves-effect waves-light indigo lighten-5 black-text catalog-button' to={'/catalog/'+category.Id}>{category.name}</Link>
  )
}
