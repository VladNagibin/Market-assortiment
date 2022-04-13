import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import Products from '../stuff/Products'

export default function Finder() {
    const text = useParams().text
    const { request, loading } = useHttp()
    const [foundedProducts, setFoundedProducts] = useState([])
    useEffect(() => {
        updateFoundedProducts()
    }, [])
    function loader(){
        if (loading) {
            return (
                <div className="progress blue lighten-2">
                    <div className="indeterminate blue darken-4"></div>
                </div>)
        } else {
            return 
        }
    }
    async function updateFoundedProducts() {
        var data = await request('/api/Finder?text=' + text)
        setFoundedProducts(data.result)
    }
    return (
        <div className='container'>
            <div className='row'>
                <Products products={foundedProducts} />
                {loader()}

            </div>

        </div>
    )
}
