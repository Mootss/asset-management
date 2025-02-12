import Collapse from "./Collapse"
import CollapseHeader from "./CollapseHeader"
import StaffAssetsTable from "./StaffAssetsTable"
import StaffAssetsRow from "./StaffAssetsRow"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "../../utils/API"

// const apiURL = "https://moothy.pythonanywhere.com"

// async function fetchStaffCurrent(setAssignedAssets, staffID) {
//     try {
//         const response = await fetch(`${apiURL}/staff/${staffID}/current`)

//         if (!response.ok) {
//             console.log(response)
//             throw new Error("Error fetching staff current data")
//         } else {
//             const assigned = await response.json()
//             // console.log(assigned)
//             setAssignedAssets(assigned)
//         }

//     } catch (error) {
//         console.error(error)
//     }
// }

export default function StaffCollapse({ staff }) {
    const { isLoading, data: assignedAssets, isError, error, isFetching } = useQuery({
        queryKey: ["assignedAssets", staff.national_id],
        queryFn: () => fetchAPI({
            url: `/staff/${staff.national_id}/current`
        }),
        // staleTime: 1000 * 60 * 15
    })

    // const [assignedAssets, setAssignedAssets] = useState([])

    // useEffect(() => {
    //     fetchStaffCurrent(setAssignedAssets, staff.national_id)
    // }, [staff.national_id])

    if (isError) {
        return <h1>ERROR FETCHING DATA: {error.message}</h1>
    }

    return (
        <>
            <Collapse
                key={staff.national_id}
                header={
                    <CollapseHeader
                        name={staff.name}
                        NID={staff.national_id}
                        department={staff.department}
                        avatarURL="avatar.png" // generic avatar icon
                    />
                }

                content={
                    isLoading ? (
                        <div className="flex justify-center items-center mt-6">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (isLoading === false && assignedAssets.length === 0)
                        ? (<h1>• No assets currently assigned</h1>)
                        : (
                            <StaffAssetsTable>
                                {assignedAssets.map((asset, index) => (
                                    <StaffAssetsRow
                                        key={index}
                                        no={index + 1}
                                        asset={asset.type}
                                        status={asset.status}
                                        location={asset.location}
                                        purchasedDate={new Date(asset.purchased_date).toLocaleDateString("en-GB")}
                                        assignedDate={new Date(asset.assigned_date).toLocaleDateString("en-GB")}
                                    />
                                ))}

                            </StaffAssetsTable>
                        )
                }
            />
        </>
    )
}