import { useState, useEffect } from "react"
import StaffCollapse from "../components/Collapse/StaffCollapse"

async function fetchStaff(setStaffData, setLoading) {
    try {
        const response = await fetch("http://127.0.0.1:5000/staff")

        if (!response.ok) {
            console.log(response)
            throw new Error("Error fetching staff data")
        } else {
            const staffData = await response.json()
            setStaffData(staffData)
            setLoading(false)
        }

    } catch (error) {
        console.error(error)
        setLoading(false)
    }
}

export default function Staff() {
    const [staffData, setStaffData] = useState([])
    const [loading, setLoading] = useState(true)
    // const [assetsData, setAssetsData] = useState([])

    useEffect(() => {
        fetchStaff(setStaffData, setLoading)
        // fetchAssets(setAssetsData)
    }, [])

    return (
        <>
            {loading ? (
                <div className="flex justify-center mt-12">
                    <img src="/preloader.gif" alt="Loading.." className="h-60 w-auto" />
                </div>
            ) : (
                <div className="m-4 mt-6">
                    <div className="join join-vertical w-full shadow-md">
                        {staffData.map(staff => (
                            <StaffCollapse
                                key={staff.national_id}
                                staff={staff}
                            />
                        ))}
                    </div>
                </div>
            )}

        </>
    )
}