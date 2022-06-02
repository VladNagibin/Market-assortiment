import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import Categories from './Categories'
export default function TreeOfCategories({ categories }) {
    const [childCategories, updateChildCategories] = useState([])
    const [defaultChildren, setDefaultChildren] = useState([])
    const { request } = useHttp()
    const childlength = {
        height:childCategories.length<18?'708px':(Math.round(childCategories.length/2)*80)+'px'
    }
    async function setDefault() {
        const data = await request('/api/getCategory?id=14')
        setDefaultChildren(data.result)
        updateChildCategories(data.result)
        
    }
    async function openChild(categories) {
        updateChildCategories(categories)
    }
    function destroyChildCategories() {
        updateChildCategories(defaultChildren)
    }
    function drawchildCategories() {
        if (childCategories.length && categories.length) {
            return (
                <div className='col l9 hide-on-med-and-down black-text childCategories-right' style={childlength}>
                    <div className='row'>
                        <Categories categories={childCategories} openChild={openChild} parent={false} />
                    </div>
                </div>
            )

        } else {
            return (<></>)
        }
    }

    useState(() => {
        setDefault()
    }, [])
    return (
        <>
            <div>
                <div className='col s12 l3 white-text childCategories-left'>
                    <Categories categories={categories} openChild={openChild} parent={true} />
                </div>
                {drawchildCategories()}
            </div>
        </>
    )
}
//<Categories categories={childCategories} openChild={openChild} parent={false}/>