import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(req:Request){
    try{
        const {userId} = auth()
        const body = await req.json()
        const {name} = body

        // ?  Check if there is a User and Name in Body
        if(!userId) return new NextResponse("Unauthorized",{status : 401})
        if(!name) return new NextResponse("Name is Required",{status : 400})


        // ? Create My Store
        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store)

    }catch(e){
        console.log("[STORES_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}