import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";

interface SettingPageProps{
    params:{
        storeId:string;
    }
}


const page:React.FC<SettingPageProps> = async ({
    params
}) => {

    const {userId}=auth()

    if(!userId) redirect("/sing-in")


    const store = await prismadb.store.findFirst({
        where: {id:params.storeId,userId:userId}
    })

    if(!store) redirect("/")

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default page