import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request,{params}:{params : {storeId:string}}){
    try{
        const {userId} = auth()
        const body = await req.json()
        const {name,value} = body

        // ?  Check if there is a User and label and Image in Body
        if(!userId) return new NextResponse("Unauthenticated",{status : 401})
        if(!name) return new NextResponse("Name is Required",{status : 400})
        if(!value) return new NextResponse("Value is Required",{status : 400})
        if(!params.storeId) return new NextResponse("Store ID is Required",{status : 400})


        // ? Check if the Store Billboard is changed by its owner

        const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized",{status : 403})

        // ? Create My Billboard
        const size = await prismadb.size.create({
            data:{
                name,
                value,
                storeId:params.storeId
            }
        })

        return NextResponse.json(size)

    }catch(e){
        console.log("[SIZES_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}


export async function GET(req:Request,{params}:{params : {storeId:string}}){
    try{

        // ?  Check if there is a Store id in params
        if(!params.storeId) return new NextResponse("Store ID is Required",{status : 400})

        // ? GET All the Billboards
        const size = await prismadb.size.findMany({
            where:{
                storeId: params.storeId
            }
        })

        return NextResponse.json(size)

    }catch(e){
        console.log("[SIZES_GET]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}