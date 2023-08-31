import { getGrapRevenue } from "@/actions/getGrapRevenue"
import { getSalesCount } from "@/actions/getSalesCount"
import { getStockCount } from "@/actions/getStockCount"
import { getTotalRevenue } from "@/actions/getTotalRevenue"
import Overview from "@/components/Overview"
import ApiAlert from "@/components/ui/ApiAlert"
import Heading from "@/components/ui/Heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package2 } from "lucide-react"



interface DashboardPageProps{
    params:{storeId:string}
}


const DashboardPage :React.FC<DashboardPageProps>= async ({params}) => {
  const totalRevenue =await getTotalRevenue(params.storeId)
  const salesCount =await getSalesCount(params.storeId)
  const stockCount = await getStockCount(params.storeId)
  const data = await getGrapRevenue(params.storeId)


  return (
    <div className="flex-col">  
      <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading 
            title="Dashboard"
            subtitle="Overview of your Store"
          />
          <Separator />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatter.format(totalRevenue)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                    {stockCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  + {salesCount}
                </div>
              </CardContent>
            </Card>
            <ApiAlert 
              title="Store API Key"
              description={`${params.storeId}`}
              variant="public"
            />
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                  OverView
              </CardTitle>
              <CardContent className="pl-2">
                <Overview data={data} />
              </CardContent>
            </CardHeader>
          </Card>
      </div>
    </div>
  )
}

export default DashboardPage