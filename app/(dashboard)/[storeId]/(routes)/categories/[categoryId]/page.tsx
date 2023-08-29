import prismadb from "@/lib/prismadb"
import CategoryForm from "./components/CategoryForm"

const page = async ({
    params
}:{
    params : {storeId:string, categoryId:string}
}) => {

    const category = await prismadb.category.findUnique({
        where:{
            id:params.categoryId
        }
    })

    const billboard = await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <CategoryForm initialData={category} billboards={billboard} />
            </div>
        </div>
    )
}

export default page