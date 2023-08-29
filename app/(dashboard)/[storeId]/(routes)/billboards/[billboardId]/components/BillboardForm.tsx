"use client"


import * as z from "zod"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/modals/AlertModal"
import { useOrigin } from "@/hooks/useOrigin"
import ImageUpload from "@/components/ui/ImageUpload"

interface BillboardFormProps{
    initialData:Billboard | null
}

const formSchema = z.object({
    label:z.string().min(2),
    imageUrl:z.string().min(2)
})

type BillboardFormValues=z.infer<typeof formSchema>

const BillboardForm : React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Billboard" : "Create Billboard"
    const description = initialData ? "Edit a Billboard" : "Add a Billboard"
    const toastMessage = initialData ? "Billboard updated" : "Billboard Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<BillboardFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            label : '',
            imageUrl : ''
        }
    })

    const onSubmit=async(data:BillboardFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data)
            }else{
                await axios.post(`/api/${params.storeId}/billboards/`,data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards/`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    const onDelete = async()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard Deleted")
        } catch (error) {
            toast.error("Make sure you removed all category in this Billboard")
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

    const origin = useOrigin()

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={()=>setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading 
                    title={title}
                    subtitle={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant='destructive'
                        size="sm"
                        onClick={()=>setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                     <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            disabled={loading}
                                            onChange={(url)=>field.onChange(url)}
                                            onRemove={()=>field.onChange("")}
                                            value={field.value ? [field.value] : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="ml-auto" disabled={loading}>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default BillboardForm