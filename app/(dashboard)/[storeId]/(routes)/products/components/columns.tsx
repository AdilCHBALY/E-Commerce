"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Check, X } from "lucide-react"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
    id:string
    name:string
    isFeatured:boolean
    isArchived:boolean
    price:string
    category:string
    size:string
    color:string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
        cell : ({row})=>(
            <div className="flex items-center justify-center">
                {row.original.isArchived ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                ) : (<X className="h-5 w-5 text-rose-500" />)}
            </div>
        )
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
        cell : ({row})=>(
            <div className="flex items-center justify-center">
                {row.original.isFeatured ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                ) : (<X className="h-5 w-5 text-rose-500" />)}
            </div>
        )
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell:({row})=>(
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div className="h-6 w-6 rounded-full border" style={{backgroundColor : row.original.color}} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]
