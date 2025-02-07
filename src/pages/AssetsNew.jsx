import Card from "../components/Card"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Label from "../components/Label"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "../utils/API"

export default function AssetsNew() {
    const { isLoading, data: staffData, isError, error } = useQuery({
        queryKey: ["staff"],
        queryFn: () => fetchAPI({
            url: "/staff"
        }),
        staleTime: 1000 * 60 * 15
    })

    const [type, setType] = useState("")
    const [purchasedDate, setPurchasedDate] = useState("")
    const [status, setStatus] = useState("not-assigned")
    const [assignedDate, setAssignedDate] = useState("")
    const [staff, setStaff] = useState("")
    const [location, setLocation] = useState("")
    const [discardedDate, setDiscardedDate] = useState("")
    //const [lastReturnedDate, setLastReturnedDate] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            type,
            purchasedDate,
            status,
            assignedDate,
            staff
        }

        // fetchAPI({
        //     url: "/asset/create"
        // })
        console.log(data)
    }

    if (isError) {
        return <h1>ERROR FETCHING DATA: {error.message}</h1>
    }

    return (
        <>
            <Card>
                {isLoading ? (
                    <div className="flex justify-center items-center my-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between m-4 mb-6">
                            <h1 className="font-bold text-2xl underline underline-offset-8">
                                New Asset
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
                                    <option value="not-assigned">Not Assigned</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="discarded">Discarded</option>
                                </select>
                            </Label>

                            {status === "assigned" && (
                                <>
                                    <Label name="Select assigned staff">
                                        <select
                                            required
                                            value={staff}
                                            onChange={e => { setStaff(e.target.value) }}
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            <option value="" disabled>
                                                -- Select a staff --
                                            </option>
                                            {staffData.map(staff => (
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

                            {status === "assigned" && (
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

                            <button type="submit" className="btn btn-neutral mt-4 hover:shadow-md hover:text-white">
                                Add asset
                            </button>
                        </form>
                    </>
                )}
            </Card>
            <p>this page is incomplete</p>
        </>
    )
}