import Card from "../components/Card"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Label from "../components/Label"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "../utils/API"
import { convertDate } from "../utils/general"

export default function AssetsEdit() {
    const staff = useQuery({
        queryKey: ["staff"],
        queryFn: () => fetchAPI({
            url: "/staff"
        }),
        staleTime: Infinity
    })

    const { id } = useParams()

    const asset = useQuery({
        queryKey: ["asset", id],
        queryFn: () => fetchAPI({
            url: `/assets/${id}`
        })
    })

    const navigate = useNavigate()
    const [assetCurrentData, setAssetCurrentData] = useState(null)
    const [isAssetDataSame, setIsAssetDataSame] = useState(true)

    const [type, setType] = useState("")
    const [purchasedDate, setPurchasedDate] = useState("")
    const [status, setStatus] = useState("")
    const [assignedDate, setAssignedDate] = useState("")
    const [assignedStaff, setAssignedStaff] = useState("")
    const [location, setLocation] = useState("")
    const [discardedDate, setDiscardedDate] = useState("")
    const [lastReturnedDate, setLastReturnedDate] = useState("")

    const [loading, setLoading] = useState(false) // submit loading

    useEffect(() => {
        if (asset.data) {
            const assetData = {
                type: asset.data[0].type,
                purchasedDate: asset.data[0].purchased_date,
                status: asset.data[0].status,
                assignedDate: asset.data[0].assigned_date,
                assignedStaff: asset.data[0].assigned_staff,
                location: asset.data[0].location,
                discardedDate: asset.data[0].discarded_date,
                lastReturnedDate: asset.data[0].last_returned_date
            }

            setAssetCurrentData(assetData)

            setType(assetData.type)
            setPurchasedDate(convertDate(assetData.purchasedDate))
            setStatus(assetData.status)
            
            setAssignedDate(convertDate(assetData.assignedDate))

            setAssignedStaff(assetData.assignedStaff)

            setLocation(assetData.location)
            setDiscardedDate(convertDate(assetData.discardedDate))
            setLastReturnedDate(convertDate(assetData.lastReturnedDate))
        }
    }, [asset.data])

    useEffect(() => { // check if form has been edited, if edited let user click btn
        if (assetCurrentData) {
            switch (true) {
                case assetCurrentData.type !== type:
                case convertDate(assetCurrentData.purchasedDate) !== purchasedDate:
                case assetCurrentData.status !== status:
                case convertDate(assetCurrentData.assignedDate) !== assignedDate:
                case assetCurrentData.assignedStaff !== assignedStaff:
                case assetCurrentData.location !== location:
                case convertDate(assetCurrentData.discardedDate) !== discardedDate:
                    setIsAssetDataSame(false)
                    break

                default:
                    setIsAssetDataSame(true)
            }
        }

    }, [type, purchasedDate, status, assignedDate, assignedStaff, location, discardedDate])

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const data = {
            type,
            purchasedDate,
            status,
            assignedDate,
            assignedStaff,
            location,
            discardedDate,
        }

        const res = await fetchAPI({
            url: `/assets/edit/${id}`,
            method: "post",
            body: data,
        })

        if (res.success === true) {
            // success/fail popup here
            console.log(1)
        }

        navigate("/assets")
        setLoading(false)
        console.log(data)
        console.log(res)

        // do sth with res
    }

    if (staff.isError) {
        return <h1>ERROR FETCHING DATA: {staff.error.message}</h1>
    }

    return (
        <>
            <Card>
                {(staff.isLoading || asset.isLoading) ? (
                    <div className="flex justify-center items-center my-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between m-4 mb-6">
                            <h1 className="font-bold text-2xl underline underline-offset-8">
                                Edit Asset
                            </h1>
                            <Link to="/assets">
                                <FontAwesomeIcon icon={faXmark} className="text-3xl" />
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="mx-4">

                            <Label name="Asset type">
                                <input
                                    type="text"
                                    placeholder="eg. Computer"
                                    value={type}
                                    onChange={e => { setType(e.target.value) }}
                                    required
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </Label>

                            <Label name="Purchase date">
                                <input
                                    type="date"
                                    value={purchasedDate}
                                    onChange={e => { setPurchasedDate(e.target.value) }}
                                    required
                                    className="input input-bordered"
                                />
                            </Label>

                            <Label name="Select status">
                                <select
                                    required
                                    value={status}
                                    onChange={e => { setStatus(e.target.value) }}
                                    className="select select-bordered w-full max-w-xs"
                                >
                                    <option value="Not Assigned">Not Assigned</option>
                                    <option value="Assigned">Assigned</option>
                                    <option value="Discarded">Discarded</option>
                                </select>
                            </Label>

                            {status === "Assigned" && (
                                <>
                                    <Label name="Select assigned staff">
                                        <select
                                            required
                                            value={assignedStaff}
                                            onChange={e => { setAssignedStaff(e.target.value) }}
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            <option value="1" disabled>
                                                -- Select a staff --
                                            </option>
                                            {staff.data.map(staff => (
                                                <option key={staff.national_id} value={staff.national_id}>
                                                    {staff.national_id} ({staff.name})
                                                </option>
                                            ))}
                                        </select>
                                    </Label>

                                    <Label name="Assigned date">
                                        <input
                                            type="date"
                                            value={assignedDate}
                                            onChange={e => { setAssignedDate(e.target.value) }}
                                            required
                                            className="input input-bordered"
                                        />
                                    </Label>

                                    <Label name="Location">
                                        <input
                                            type="text"
                                            placeholder="eg. Office 101"
                                            value={location}
                                            onChange={e => { setLocation(e.target.value) }}
                                            required
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                    </Label>
                                </>
                            )}

                            {status === "Discarded" && (
                                <>
                                    <Label name="Discarded date">
                                        <input
                                            type="date"
                                            value={discardedDate}
                                            onChange={e => { setDiscardedDate(e.target.value) }}
                                            required
                                            className="input input-bordered"
                                        />
                                    </Label>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={isAssetDataSame || loading}
                                className="btn btn-neutral mt-4 hover:shadow-md hover:text-white"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Save changes
                                    </>
                                ) : (
                                    <>Save changes</>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </Card>
        </>
    )
}