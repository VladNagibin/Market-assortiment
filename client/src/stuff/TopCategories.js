import React from 'react'
import TopCategory from './TopCategory'

export default function TopCategories({ categories }) {
    return (
        categories.map(category => {
            return <TopCategory category={category} key={category.Id}/>
        })
    )
}
