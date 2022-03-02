import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Categories from '../stuff/Categories'
import Products from '../stuff/Products'
export default function Main() {
  const {loading,request,error,CleanErrors}=useHttp()
  const [currentGroup, updateCurrGroup] = useState({'id':0,'name':'main'})
  const message = useMessage()
  const [categories,updateCategories] = useState([])
  const [products,updateProducts] = useState([])
  async function clickCategories(id,name = 'main'){
    updateCurrGroup({id:id,name:name})
    const data = await request('/api/getCategory?id='+id)
    updateCategories(data.result)
    if(currentGroup.id !=0){
      openProducts()
    }
  }
  async function GoBack(){
    clickCategories(0)
  }
  async function openProducts(){
    const data = await request('/api/getProducts?id='+currentGroup.id)
    updateProducts(data.result)
    console.log(products.length)
  }
  
  useEffect(()=>{
    clickCategories(0)
  },[])
  useEffect(()=>{
    //console.log(error)
    message(error)
    CleanErrors()
  },[error,CleanErrors])
  return (
    <>
    <div>
      <h1>{currentGroup.name}</h1>
      <Categories categories={categories} clickCategory = {clickCategories}/>
      <button onClick={GoBack}>Домой</button>
      <button onClick={openProducts}>Получить товары</button>
      <br/>
      <Products products = {products}/>
    </div>
    </>
  )
}
