"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"


interface OrderClientProps{
  data:OrderColumn[]
}

const OrderClient:React.FC<OrderClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
        <Heading 
                title={`Orders (${data.length})`}
                subtitle="Manage orders for your store"
          />
        <Separator />
        <DataTable
          searchKey="products"
          columns={columns}
          data={data}
        />
    </>
  )
}

export default OrderClient