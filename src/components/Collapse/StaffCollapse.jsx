import Collapse from "./Collapse"
import CollapseHeader from "./CollapseHeader"
import StaffAssetsTable from "./StaffAssetsTable"
import StaffAssetsRow from "./StaffAssetsRow"
import { useEffect, useState } from "react"

const apiURL = "http://127.0.0.1:5000"

async function fetchStaffCurrent(setAssignedAssets, staffID) {
    try {
        const response = await fetch(`${apiURL}/staff/${staffID}/current`)

        if (!response.ok) {
            console.log(response)
            throw new Error("Error fetching staff current data")
        } else {
            const assigned = await response.json()
            // console.log(assigned)
            setAssignedAssets(assigned)
        }

    } catch (error) {
        console.error(error)
    }
}

export default function StaffCollapse({ staff }) {
    const [assignedAssets, setAssignedAssets] = useState([])

    useEffect(() => {
        fetchStaffCurrent(setAssignedAssets, staff.national_id)
    }, [staff.national_id])

    return (
        <>
            <Collapse
                key={staff.national_id}
                header={
                    <CollapseHeader
                        name={staff.name}
                        NID={staff.national_id}
                        department={staff.department}
                        avatarURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP4eCvAfwGYqMo7py3NDh6V0sNiK1R_15Htg&s" // generic avatar icon
                    />
                }

                content={
                    assignedAssets.length === 0 ? (<h1>• No assets currently assigned</h1>) : (
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