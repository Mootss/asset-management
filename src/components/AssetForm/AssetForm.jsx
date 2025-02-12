import { Link, useNavigate } from "react-router-dom"
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

    const navigate = useNavigate()

    const [type, setType] = useState("")
    const [purchasedDate, setPurchasedDate] = useState("")
    const [status, setStatus] = useState("Not Assigned")
    const [assignedDate, setAssignedDate] = useState("")
    const [assignedStaff, setAssignedStaff] = useState("")
    const [location, setLocation] = useState("")
    const [discardedDate, setDiscardedDate] = useState("")

    const [loading, setLoading] = useState(false)
    //const [lastReturnedDate, setLastReturnedDate] = useState("")

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
            url: "/assets/create",
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

    if (isError) {
        return <h1>ERROR FETCHING DATA: {error.message}</h1>
    }

    return (
        <>
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

                {status === "discarded" && (
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
                    disabled={loading}
                    className="btn btn-neutral mt-4 hover:shadow-md hover:text-white"
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Add asset
                        </>
                    ) : (
                        <>Add asset</>
                    )}
                </button>
            </form>
        </>
    )
}