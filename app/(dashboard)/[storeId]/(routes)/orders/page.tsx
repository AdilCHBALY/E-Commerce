import prismadb from "@/lib/prismadb"
import { OrderColumn } from "./components/columns"
import {format} from 'date-fns'
import { formatter } from "@/lib/utils"
import OrderClient from "./components/client"

const page = async ({params}:{params : {storeId:string}}) => {
    const orders = await prismadb.order.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    const formattedOrders : OrderColumn[] = orders.map((item)=>({
        id:item.id,
        phone:item.phone,
        address:item.address,
        isPaid:item.isPaid,
        totalPrice: formatter.format(item.orderItems.reduce((total,item)=>{
            return total + Number(item.product.price)
        },0)),
        products : item.orderItems.map((item)=>item.product.name).join(', '),
        createdAt: format(item.createdAt,"MMMM do , yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient  data={formattedOrders} />
            </div>
        </div>
    )
}

export default page