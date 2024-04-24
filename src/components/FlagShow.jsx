import React from 'react'
import Countries from './CountryInfo'
const FlagShow = () => {
  return (
    <>
    <div>FlagShow</div>
    <div>
{Countries.map((item)=>{
    console.log(item);
    return(
        <>
        <h1>{item.name}</h1>
        <img src={item.image}/>
        </>
    )
})}
    </div>
    </>
  )
}

export default FlagShow