import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from '../stuff/TreeOfCategories'
import Products from '../stuff/Products'
import ReactPaginate from 'react-paginate'
import { Link, useParams } from 'react-router-dom'
export default function Catalog() {
    const { request, error, CleanErrors } = useHttp()
    const parid = useParams().id
    const [name, updateName] = useState()
    const message = useMessage()
    const [pageCount, updatePageCount] = useState(0)
    const [products, updateProducts] = useState([])
    const [drawedProducts, updateDrawedProducts] = useState([])
    function getCategoryName() {
        request('/api/getCategoryName?id=' + parid).then(data => {
            updateName(data.name)
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
    }, [parid])
    useEffect(() => {
        //console.log(error)
        message(error)
        CleanErrors()
    }, [error, CleanErrors])
    return (
        <>
            <div className='row'>
                <h1>{name}</h1>
                <button><Link to={'/catalog/0'}>Домой</Link></button>
                <br />
                <Products products={drawedProducts} />
                <ReactPaginate
                    onPageChange={pageClickHandler}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    activeClassName="active"
                    className='col s12 center-align pagination'
                    pageClassName='waves-effect'
                />
            </div>
        </>
    )
}
