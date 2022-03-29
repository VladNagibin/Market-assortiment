import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import Categories from './Categories'
export default function TreeOfCategories({ categories }) {
    const { request, loading } = useHttp()
    const [childCategories, updateChildCategories] = useState([])
    async function openChild(categories) {
        updateChildCategories(categories)
    }
    function destroyChildCategories() {
        openChild([])
    }
    function drawchildCategories() {
        if (childCategories.length) {
            return (
                <div className='col s2 offset-s3 collection white childCategories'>
                    <Categories categories={childCategories} openChild={openChild} parent={false} />
                </div>
            )

        }else{
            return(<></>)
        }
    }
    return (
        <>
            <div onMouseLeave={destroyChildCategories}>
                <div className='col s2 offset-s1 collection white childCategories'>
                    <Categories categories={categories} openChild={openChild} parent={true} />
                </div>
                {drawchildCategories()}
            </div>
        </>
    )
}
//<Categories categories={childCategories} openChild={openChild} parent={false}/>