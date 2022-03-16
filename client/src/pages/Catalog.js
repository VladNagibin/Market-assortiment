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
    const [grName, updateGrName] = useState('')
    const message = useMessage()
    const [pageCount, updatePageCount] = useState(0)
    const [categories, updateCategories] = useState([])
    const [products, updateProducts] = useState([])
    const [drawedProducts, updateDrawedProducts] = useState([])
    async function getCategories(id) {
        var data = await request('/api/getCategory?id=' + id)
        updateGrName(data.name)
        updateCategories(data.result)
        // 
        // 
        // 

    }
    const pageClickHandler = (event) => {
        updateDrawedProducts(products.slice(event.selected * 20, event.selected * 20 + 20));
    }
    function cleanProducts(){
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
        getCategories(parid)
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
                <h1>{grName}</h1>

                <TreeOfCategories categories={categories} />
                <button><Link to={'/catalog/0'}>Домой</Link></button>
                <br />
                <div className="col s12 m7">
                    <Products products={drawedProducts} />
                </div>
                <ReactPaginate
                    onPageChange={pageClickHandler}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    activeClassName="active"
                    className='pagination'
                    pageClassName='waves-effect'
                />
            </div>
        </>
    )
}
