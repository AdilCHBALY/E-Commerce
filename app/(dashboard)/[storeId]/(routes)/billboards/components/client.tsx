"use client"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"


interface BillboardClientProps{
  data:BillboardColumn[]
}

const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {
  const router = useRouter()
  const params = useParams()


  return (
    <>
        <div className="flex items-center justify-between">
            <Heading 
                title={`Billboard (${data.length})`}
                subtitle="Manage billboards for your store"
            />
            <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
                <Plus  className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
        <Separator />
        <DataTable
          searchKey="label"
          columns={columns}
          data={data}
        />
        <Heading 
          title="API"
          subtitle="API Calls for Billboard"
        />
        <Separator/>
        <ApiList
          entityName="billboards"
          entityIdName="billboardId"
        />
    </>
  )
}

export default BillboardClient