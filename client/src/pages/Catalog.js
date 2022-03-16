import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from '../stuff/TreeOfCategories'
import Products from '../stuff/Products'
import ReactPaginate from 'react-paginate'
export default function Catalog() {
    const { loading, request, error, CleanErrors } = useHttp()
    const [currentGroup, updateCurrGroup] = useState({ 'id': 0, 'name': 'Каталог' })
    const message = useMessage()
    const [pageCount, updatePageCount] = useState(0)
    const [categories, updateCategories] = useState([])
    const [products, updateProducts] = useState([])
    const [drawedProducts, updateDrawedProducts] = useState([])
    async function clickCategories(id, name = 'Каталог') {
        updateCurrGroup({ id: id, name: name }) 
        const data = await request('/api/getCategory?id=' + id)
        console.log(id)
        if(id!==0){
            openProducts()
        }
        else{
            updateDrawedProducts([])
            updateProducts([])
            updatePageCount(0)
        }
        updateCategories(data.result)

    }
    const pageClickHandler = (event) => {
        updateDrawedProducts(products.slice(event.selected*20,event.selected*20+20));
    }
    async function GoBack() {
        clickCategories(0)
    }
    async function openProducts() {
        const data = await request('/api/getProductsTwenty?id=' + currentGroup.id)
        request('/api/getProducts?id=' + currentGroup.id).then(full_data => {
            updateProducts(full_data.result)
            updatePageCount(Math.ceil(full_data.result.length / 20))
        })
        try {
            updateDrawedProducts(data.result)
        } catch {
            message('Нет товаров')
        }
    }

    useEffect(() => {
        clickCategories(0)       
    }, [])
    useEffect(() => {
        //console.log(error)
        message(error)
        CleanErrors()
    }, [error, CleanErrors])
    return (
        <>
            <div className='row'>
                <h1>{currentGroup.name}</h1>

                <TreeOfCategories categories={categories} clickCategory={clickCategories} />
                <button onClick={GoBack}>Домой</button>
                <br />
                <div className="col s12 m7">
                    <Products products={drawedProducts} />
                </div>
                <ReactPaginate
                    onPageChange={pageClickHandler}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    activeClassName = "active"
                    className='pagination'
                    pageClassName='waves-effect'
                />
            </div>
        </>
    )
}
