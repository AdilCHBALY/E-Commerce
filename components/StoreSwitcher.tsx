"use client"

import { Store } from "@prisma/client"
import { Popover, PopoverTrigger,PopoverContent } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"


type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
    items:Store[]
}

const StoreSwitcher = ({
    className,
    items=[]
}:StoreSwitcherProps) => {
    const [open,setOpen]=useState(false)
    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) =>({
        label : item.name,
        value : item.id
    }))

    const currentStore = formattedItems.find((item) =>item.value===params.storeId)

    const onStoreSwitched = (store : { value : string,label:string})=>{
        setOpen(false)
        router.push(`/${store.value}`)
    }



    return (
        <Popover 
            open={open}
            onOpenChange={setOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        size='sm'
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a store"
                        className={cn(`w-[200px] justify-between`,className)}
                    >
                        <StoreIcon className="mr-2 h-4 w-4" />
                        {currentStore?.label}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search Store" />
                            <CommandEmpty>
                                No Store Found
                            </CommandEmpty>
                            <CommandGroup heading="Stores">
                                {formattedItems.map((item)=>(
                                    <CommandItem
                                        key={item.value}
                                        onSelect={()=>onStoreSwitched(item)}
                                        className="text-sm"
                                    >
                                        <StoreIcon className="mr-2 h-4 m-4" />
                                        {item.label}
                                        <Check 
                                            className={cn("ml-auto text-emerald-500 h-4 w-4",
                                                currentStore?.value === item.value ? "opacity-100" : "opacity-0"
                                            )}

                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <CommandItem
                                    onSelect={()=>{
                                        setOpen(false)
                                        storeModal.onOpen()
                                    }}
                                >
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Create Store
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher