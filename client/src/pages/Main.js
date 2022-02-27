import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export default function Main() {
  const {loading,request,error,CleanErrors}=useHttp()
  const message = useMessage()
  const [categories,updateCategories] = useState([])
  const clickCategories = event =>{

  }
  useEffect(()=>{
    //console.log(error)
    message(error)
    CleanErrors()
  },[error,CleanErrors])
  return (
    <div>
      <h1>Мейн</h1>
    </div>
  )
}
