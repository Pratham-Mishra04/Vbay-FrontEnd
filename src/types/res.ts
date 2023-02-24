interface resData{
    token?:any,
    user?:any,
    product?:any,
    products?:any,
    message?:any
}

interface res{
    status:number,
    data:resData
}


export default res


//system(res->data)->user//product//models