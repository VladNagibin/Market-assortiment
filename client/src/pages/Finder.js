import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import Products from '../stuff/Products'

export default function Finder() {
    const text = useParams().text
    const { request, loading } = useHttp()
    const [foundedProducts, setFoundedProducts] = useState([])
    const [drawedProducts, setDrawedProducts] = useState([])
    const [pageCount,updatePageCount] = useState(0)
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
    const pageClickHandler = (event)=>{
        setDrawedProducts(foundedProducts.slice(event.selected * 20, event.selected * 20 + 20));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
    } 
    async function updateFoundedProducts() {
        var data = await request('/api/Finder?text=' + text)
        setFoundedProducts(data.result)
        setDrawedProducts(data.result.slice(0, 20));
        if (data.result.length < 20) {
            updatePageCount(0)
        } else {
            updatePageCount(Math.ceil(data.result.length / 20))
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <Products products={drawedProducts} />
                {loader()}
                <ReactPaginate
                    onPageChange={pageClickHandler}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    activeClassName="active blue"
                    className='col s12 center-align pagination'
                    pageClassName='waves-effect'
                />
            </div>

        </div>
    )
}
