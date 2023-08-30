import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params : {storeId:string}}){
    try{
        const {userId} = auth()
        const body = await req.json()
        const {
            name,
            price,
            categoryId,
            sizeId,
            colorId,
            images,
            isFeatured,
            isArchived
        } = body

        // ?  Check if there is a User and label and Image in Body
        if(!userId) return new NextResponse("Unauthenticated",{status : 401})
        if(!name) return new NextResponse("Name is Required",{status : 400})
        if(!price) return new NextResponse("Price is Required",{status : 400})
        if(!categoryId) return new NextResponse("Category is Required",{status : 400})
        if(!sizeId) return new NextResponse("Size is Required",{status : 400})
        if(!colorId) return new NextResponse("Color is Required",{status : 400})
        if(!images || !images.length) return new NextResponse("Images are Required",{status : 400})
        if(!params.storeId) return new NextResponse("Store ID is Required",{status : 400})


        // ? Check if the Store Product is changed by its owner

        const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized",{status : 403})

        // ? Create My Product
        const product = await prismadb.product.create({
            data:{
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                images :  {
                    createMany : {
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                },
                isFeatured,
                isArchived,
                storeId:params.storeId
            }
        })

        return NextResponse.json(product)

    }catch(e){
        console.log("[PRODUCTS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}


export async function GET(req:Request,{params}:{params : {storeId:string}}){
    try{

        const {searchParams}=new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured") || undefined



        // ?  Check if there is a Store id in params
        if(!params.storeId) return new NextResponse("Store ID is Required",{status : 400})

        // ? GET All the Products
        const products = await prismadb.product.findMany({
            where:{
                storeId: params.storeId,
                categoryId: categoryId,
                colorId: colorId,
                sizeId: sizeId,
                isFeatured : isFeatured ? true : undefined,
                isArchived:false
            },
            include : {
                images:true,
                category:true,
                color:true,
                size:true
            },
            orderBy: {
                createdAt : 'desc'
            }
        })

        return NextResponse.json(products)

    }catch(e){
        console.log("[PRODUCTS_GET]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}