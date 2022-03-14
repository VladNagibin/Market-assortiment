import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import Categories from './Categories'
export default function TreeOfCategories({ categories, clickCategory }) {
    const { request } = useHttp()
    function OpenCaterogy(id,name) {
        openChild(null)
        clickCategory(id,name)
    }
    const [childCategories, updateChildCategories] = useState([])
    async function openChild(id) {
        if (id == null) {
            updateChildCategories([])
        } else {
            //console.log(id)
            const data = await request('/api/getCategory?id=' + id)
            if (data.result.length !== 0) {
                updateChildCategories(data.result)
            } else {
                updateChildCategories([])
            }
        }
    }
    function destroyChildCategories() {
        openChild(null)
    }
    return (
        <div onMouseLeave={destroyChildCategories}>
            <Categories categories={categories} clickCategory={OpenCaterogy} openChild={openChild} parent={true} />
            <Categories categories={childCategories} clickCategory={OpenCaterogy} openChild={openChild} parent={false}/>
        </div>
    )
}
