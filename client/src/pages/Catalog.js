import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Products from '../stuff/Products'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
import TopCategories from '../stuff/TopCategories'
export default function Catalog() {
    const { request, error, CleanErrors } = useHttp()
    const parid = useParams().id
    const [name, updateName] = useState()
    const message = useMessage()
    const [pageCount, updatePageCount] = useState(0)
    const [childCategories,setChildCategories] = useState([])
    const [products, updateProducts] = useState([])
    const [drawedProducts, updateDrawedProducts] = useState([])
    function getCategoryName() {
        request('/api/getCategoryName?id=' + parid).then(data => {
            updateName(data.name)
            setChildCategories(data.child)
        })
    }
    const pageClickHandler = (event) => {
        updateDrawedProducts(products.slice(event.selected * 20, event.selected * 20 + 20));
    }
    function cleanProducts() {
        updateDrawedProducts([])
        updateProducts([])
        updatePageCount(0)
    }
    async function openProducts() {
        const data = await request('/api/getProductsTwenty?id=' + parid)
        request('/api/getProducts?id=' + parid).then(full_data => {
            updateProducts(full_data.result)
            if (full_data.result.length < 20) {
                updatePageCount(0)
            } else {
                updatePageCount(Math.ceil(full_data.result.length / 20))
            }
        })
        try {
            updateDrawedProducts(data.result)
        } catch {
            message('Нет товаров')
        }
    }

    useEffect(() => {
        getCategoryName()
        if (parid && parid !== "0") {
            openProducts()
        } else {
            cleanProducts()
        }
    }, [parid,openProducts,getCategoryName])
    useEffect(() => {
        //console.log(error)
        message(error)
        CleanErrors()
    }, [error, CleanErrors,message])
    return (
        <div className='container'>
            <div className='row'>
                <h1>{name}</h1>
                <TopCategories categories={childCategories}/>
                <br/>
                <Products products={drawedProducts} />
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
