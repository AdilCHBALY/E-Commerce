"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ColorColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import AlertModal from "@/components/modals/AlertModal"



interface CellActionProps{
    data:ColorColumn
}


const CellAction:React.FC<CellActionProps> = ({data}) => {

    const [loading,setLoading]=useState(false)
    const [open,setOpen] = useState(false)

    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("Copied to clipboard")
    }

    const onDelete = async()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
            router.refresh()
            toast.success("Color Deleted")
        } catch (error) {
            toast.error("Make sure you removed all products for this color")
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={()=>setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/colors/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpen(true)} className="text-rose-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction