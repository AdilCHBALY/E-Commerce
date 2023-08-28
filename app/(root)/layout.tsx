import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const SetupLayout = async ({children}:{children:React.ReactNode}) => {
    const {userId}=auth()

    if(!userId) redirect("/sing-in")

    const store = await prismadb.store.findFirst({
        where: {userId}
    })

    if(store) redirect(`/${store.id}`)

    return (
        <>
            {children}
        </>
    )
}

export default SetupLayout