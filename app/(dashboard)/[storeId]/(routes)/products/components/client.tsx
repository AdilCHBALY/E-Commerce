"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"


interface ProductClientProps{
  data:ProductColumn[]
}

const ProductClient:React.FC<ProductClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Products (${data.length})`}
                subtitle="Manage products for your store"
            />
            <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
                <Plus  className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable
          searchKey="name"
          columns={columns}
          data={data}
        />
        <Heading 
          title="API"
          subtitle="API Calls for Product"
        />
        <Separator/>
        <ApiList
          entityName="products"
          entityIdName="productId"
        />
    </>
  )
}

export default ProductClient