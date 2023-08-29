"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"


interface SizeClientProps{
  data:SizeColumn[]
}

const SizeClient:React.FC<SizeClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Size (${data.length})`}
                subtitle="Manage sizes for your store"
            />
            <Button onClick={()=>router.push(`/${params.storeId}/sizes/new`)}>
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
          subtitle="API Calls for Sizes"
        />
        <Separator/>
        <ApiList
          entityName="sizes"
          entityIdName="sizeId"
        />
    </>
  )
}

export default SizeClient