import AssetsTable from "../components/AssetsTable/AssetsTable"
import AssetsRow from "../components/AssetsTable/AssetsRow"
import { useEffect, useState } from "react"

const apiURL = "https://moothy.pythonanywhere.com"

async function fetchAssets(setAssetsData, setLoading) {
    try {
        const response = await fetch(`${apiURL}/assets`)

        if (!response.ok) {
            console.log(response)
            throw new Error("Error fetching assets data")
        } else {
            const assetsData = await response.json()
            console.log(assetsData)
            setAssetsData(assetsData)
            setLoading(false)
        }

    } catch (error) {
        console.error(error)
        setLoading(false)
    }
}
export default function Assets() {
    const [assetsData, setAssetsData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAssets(setAssetsData, setLoading)
    }, [])

    return (
        <>
            {loading ? (
                <div className="flex justify-center mt-12">
                    <img src="/preloader.gif" alt="Loading.." className="h-60 w-auto" />
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
        </>
    )
}