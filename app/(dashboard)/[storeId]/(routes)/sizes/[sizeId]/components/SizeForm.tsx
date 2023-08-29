"use client"


import * as z from "zod"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Size } from "@prisma/client"
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

interface SizeFormProps{
    initialData:Size | null
}

const formSchema = z.object({
    name:z.string().min(2),
    value:z.string().min(1)
})

type SizeFormValues=z.infer<typeof formSchema>

const SizeForm : React.FC<SizeFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a Size" : "Add a Size"
    const toastMessage = initialData ? "Size updated" : "Size Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<SizeFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            value : ''
        }
    })

    const onSubmit=async(data:SizeFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            }else{
                await axios.post(`/api/${params.storeId}/sizes/`,data)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes/`)
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
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size Deleted")
        } catch (error) {
            toast.error("Make sure you removed all products using this size")
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Size Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="value"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Size Value"
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

export default SizeForm