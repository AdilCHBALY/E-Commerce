"use client"


import * as z from "zod"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Color, Image, Product,Size,Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form ,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import AlertModal from "@/components/modals/AlertModal"
import { useOrigin } from "@/hooks/useOrigin"
import ImageUpload from "@/components/ui/ImageUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFormProps{
    initialData:Product & {
        images : Image[]
    } | null
    colors:Color[]|null
    sizes:Size[]|null
    categories:Category[]|null
}

const formSchema = z.object({
    name:z.string().min(2),
    images:z.object({
        url :z.string()
    }).array(),
    price:z.coerce.number().min(1),
    categoryId:z.string().min(1),
    sizeId:z.string().min(1),
    colorId:z.string().min(1),
    isFeatured:z.boolean().default(false).optional(),
    isArchived:z.boolean().default(false).optional()
})

type ProductFormValues=z.infer<typeof formSchema>

const ProductForm : React.FC<ProductFormProps> = ({
    initialData,
    categories,
    sizes,
    colors
}) => {
    const params = useParams()
    const router = useRouter()
    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Product" : "Create Product"
    const description = initialData ? "Edit a Product" : "Add a Product"
    const toastMessage = initialData ? "Product updated" : "Product Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<ProductFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData ? {
            ...initialData,
            price:parseFloat(String(initialData.price))
        } : {
            name : '',
            images : [],
            price:0,
            categoryId:'',
            sizeId:'',
            colorId:'',
            isFeatured:false,
            isArchived:false
        }
    })

    const onSubmit=async(data:ProductFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`,data)
            }else{
                await axios.post(`/api/${params.storeId}/products/`,data)
            }
            router.refresh()
            router.push(`/${params.storeId}/products/`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Product Deleted")
        } catch (error) {
            toast.error("Something went Wrong")
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
                            name="images"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            disabled={loading}
                                            onChange={(url)=>field.onChange([...field.value , {url}])}
                                            onRemove={(url)=>field.onChange([...field.value.filter((currentImage)=>currentImage.url!==url)])}
                                            value={field.value.map((image)=>image.url)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="9.99"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Category</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map((item)=>(
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Color</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a Color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors?.map((item)=>(
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizeId"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel className="font-semibold">Size</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a Size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes?.map((item)=>(
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({field})=>(
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-semibold">
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This Product will appear in your Store
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="isArchived"
                            render={({field})=>(
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-semibold">
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This Product will not appear in your Store
                                        </FormDescription>
                                    </div>
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

export default ProductForm