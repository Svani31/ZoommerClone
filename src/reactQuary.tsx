import { useQuery } from "@tanstack/react-query"
import ajax from "./util/service/ajax"
import { BanckEndItem } from "./@types/general"
import { Skeleton } from "@mui/material"


const ReactQuery = () =>{

  const {data,isLoading} = useQuery(["post-product"],()=>{
    return ajax.post("/products",{
      keyword:"",
      page_size:5,
      page_number:0
    })
  })


  if(isLoading){
    return(
      <div>
         <Skeleton variant="rectangular" width={210} height={118} />
         <h1>Loading...</h1>
      </div>
    )
  }

  return(
    <>
      {data?.data.products.map((productEl:BanckEndItem)=>{
        return(
          <div key={productEl.id}>
            <img src={productEl.images[0]} alt="" />
            <h1>{productEl.title}</h1>
          </div>
        )
      })}
    </>
    )
}


export default ReactQuery