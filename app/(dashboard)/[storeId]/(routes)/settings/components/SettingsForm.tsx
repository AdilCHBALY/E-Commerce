"use client"


import * as z from "zod"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SettingsFormProps{
    initialData:Store
}

const formSchema = z.object({
    name:z.string().min(2)
})


type SettingsFormValues=z.infer<typeof formSchema>

const SettingsForm : React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open,setOpen]=useState(false)
    const [loading,setLoading] = useState(false)


    const form = useForm<SettingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData
    })

    const onSubmit=async(data:SettingsFormValues)=>{
        console.log(data);
    }


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title="Settings"
                    subtitle="Manage store details"
                />
                <Button
                    variant='destructive'
                    size="sm"
                    onClick={()=>{}}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(

                                // ! FIX useFormContext() issue 

                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    )
}

export default SettingsForm