import AssetsTable from "../components/AssetsTable/AssetsTable"
import AssetsRow from "../components/AssetsTable/AssetsRow"
import Card from "../components/Card"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import SyncPopup from "../components/SyncPopup"
import { fetchAPI } from "../utils/API"

//let i = 0
export default function Assets() {
    const { isLoading, data: assetsData, isError, error, isFetching } = useQuery({
        queryKey: ["assets"],
        queryFn: () => fetchAPI({
            url: "/assets"
        }),
        //staleTime: 6969
    })

    //console.log({ isLoading, isFetching, i })
    //i += 1

    if (isError) {
        return <h1>ERROR FETCHING DATA: {error.message}</h1>
    }

    return (
        <>
            {isFetching && (<SyncPopup />)}

            <Card>


                <div className="flex justify-between m-4">
                    <h1 className="font-bold text-2xl underline underline-offset-8">
                        Assets
                    </h1>
                    <Link to="/assets/new">
                        <button className="btn btn-neutral btn-sm text-white shadow-md">
                            Add New Asset
                        </button>
                    </Link>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center my-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (

                    <AssetsTable>
                        {assetsData.map((asset, index) => (
                            <AssetsRow
                                key={asset.id}
                                no={index + 1}
                                type={asset.type}
                                purchasedDate={new Date(asset.purchased_date).toLocaleDateString("en-GB")}
                                status={asset.status}

                                assignedStaff={asset.assigned_date === null ? (<p>-</p>) : (asset.assigned_staff)}
                                location={asset.assigned_date === null ? (<p>-</p>) : (asset.location)}

                                assignedDate={asset.assigned_date === null ? (<p>-</p>) : (
                                    new Date(asset.assigned_date).toLocaleDateString("en-GB")
                                )}

                                discardedDate={asset.discarded_date === null ? (<p>-</p>) : (
                                    new Date(asset.discarded_date).toLocaleDateString("en-GB")
                                )}

                                lastReturnedDate={asset.last_returned_date === null ? (<p>-</p>) : (
                                    new Date(asset.last_returned_date).toLocaleDateString("en-GB")
                                )}
                            />
                        ))}
                    </AssetsTable>
                )}

            </Card>
            <p>this page is incomplete</p>
        </>
    )
}