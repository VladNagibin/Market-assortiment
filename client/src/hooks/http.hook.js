import { useCallback, useState } from "react"

export const useHttp = () =>{
    const [loading,SetLoading] = useState(false)
    const [error,SetError] = useState(null)
    const request = useCallback(async(url,method= 'GET',body = null,headers={})=>{
        SetLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }
            const responce = await fetch(url,{method,body,headers})
            const data = await responce.json()
            if(responce.status!==200){
                throw new Error(data.message || 'smth went wrong')
            }
            SetLoading(false)
            return data
        }catch(e){
            console.log(e.message)
            SetLoading(false)
            SetError(e.message)
            throw e
        }
    },[])
    const CleanErrors = ()=>{
        SetError(null)
    }
    return {loading,request,error,CleanErrors}
}