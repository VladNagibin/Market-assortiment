import React, { useState } from 'react'

import Categories from './Categories'
export default function TreeOfCategories({ categories }) {
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
                <div className='col s5 l2 offset-s5 offset-l3 collection white childCategories'>
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
                <div className='col s5 l2 offset-l1 collection white childCategories'>
                    <Categories categories={categories} openChild={openChild} parent={true} />
                </div>
                {drawchildCategories()}
            </div>
        </>
    )
}
//<Categories categories={childCategories} openChild={openChild} parent={false}/>