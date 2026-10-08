import { strapifetch } from "./strapi"

export type product={
    id:number,
    documentId:string,
    title:string,
    price:number,
    description:string,
}
type productresponse={
    data:product[]
}
export async function getproducts(token:string){
    const response=await strapifetch<productresponse>(
        "/api/products",token,
    )
    return response.data;
}