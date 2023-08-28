"use client"

import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "../ui/modal"
import { useForm } from 'react-hook-form'
import { 
   Form,
   FormControl, 
   FormField, 
   FormItem, 
   FormLabel, 
   FormMessage 
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  name:z.string().min(4)
})

const storeModal = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeModal = useStoreModal()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading,setLoading]=useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<z.infer<typeof formSchema>>({
      resolver : zodResolver(formSchema),
      defaultValues: {
        name : ""
      }
    })

    const onSubmit= async (value:z.infer<typeof formSchema>)=>{
      try{
        setLoading(true)
        const res = await axios.post('/api/stores',value)
        
        window.location.assign(`/${res.data.id}`)

      }catch(err){
        toast.error("Something went wrong")
      }finally{
        setLoading(false)
      }
    }


  return (
    <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
          <div className='space-y-4 py-2 pb-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>
                          Name <span className='text-rose-500 text-lg'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            disabled={loading}
                            placeholder='Give store name' {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
                />
                <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                    <Button
                      disabled={loading}  
                      onClick={storeModal.onClose}
                      variant='outline'>
                      Cancel
                    </Button>
                    <Button
                      disabled={loading} 
                      type='submit'>
                      Continue
                    </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
    </Modal>
  )
}

export default storeModal