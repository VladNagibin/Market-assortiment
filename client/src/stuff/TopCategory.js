import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TopCategory({category}) {
    return (
    <Link className='btn waves-effect waves-light indigo darken-1 catalog-button' to={'/catalog/'+category.Id}>{category.name}</Link>
  )
}
