import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import Categories from './Categories'
export default function TreeOfCategories({ categories }) {
    const { request, loading } = useHttp()
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