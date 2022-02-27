import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import Categories from '../stuff/Categories'
export default function Main() {
  const {loading,request,error,CleanErrors}=useHttp()
  const message = useMessage()
  const [categories,updateCategories] = useState([])
  async function clickCategories(id){
    const data = await request('/api/getCategory?id='+id)
    updateCategories(data.result)
  }
  async function GoBack(){
    clickCategories(0)
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
      <h1>Мейн</h1>
      <Categories categories={categories} clickCategory = {clickCategories}/>
      <button onClick={GoBack}>Домой</button>
    </div>
    </>
  )
}
