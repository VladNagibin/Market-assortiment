import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useHttp } from '../hooks/http.hook'
import Order from './Order'

export default function Orders({ id,admin }) {
    const { request, loading } = useHttp()
    const [orders, setOrders] = useState([])
    const [drawedOrders, setDrawedOrders] = useState([])
    const [pageCount, setPageCount] = useState(0)
    async function getAllOrders() {
        var data = await request('/api/allOrders?userId=' + id)
        setOrders(data)
        if (data.length > 20) {
            setPageCount(Math.ceil(data.length / 10))
        } else {
            setDrawedOrders(data)
            setPageCount(0)
        }
    }
    const pageClickHandler = (event) => {
        setDrawedOrders(orders.slice(event.selected * 10, event.selected * 10 + 10));
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    function loader() {
        if (loading) {
            return (
                <div className="progress blue lighten-2">
                    <div className="indeterminate blue darken-4"></div>
                </div>)
        } else {
            return
        }
    }
    return (
        <>
            {
                loader()
            }
            {
                drawedOrders.map(order => {
                    return <Order order={order} key={order._id} admin={admin}/>
                })
            }
            <ReactPaginate
                onPageChange={pageClickHandler}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                activeClassName="active blue"
                className='col s12 center-align pagination'
                pageClassName='waves-effect'
            />
        </>
    )
}
