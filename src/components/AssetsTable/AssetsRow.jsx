import { Link } from "react-router-dom";

export default function StaffAssetsRow({
    no,
    type,
    purchasedDate,
    status,
    assignedStaff,
    location,
    assignedDate,
    discardedDate,
    lastReturnedDate,
    assetID }) {

    let statusColor
    if (status === "Assigned") {
        statusColor = "bg-green-200 text-green-800"
    } else if (status === "Not Assigned") {
        statusColor = "bg-gray-200 text-gray-800"
    } else if (status === "Discarded") {
        statusColor = "bg-red-200 text-red-800";
    }

    return (
        <>
            <tr className="hover:bg-gray-50">
                <td>{no}</td>
                <td>{type}</td>
                <td>{purchasedDate}</td>
                <td>
                    <p className={`badge ${statusColor}`}>
                        {status}
                    </p>
                </td>
                <td>{assignedStaff}</td>
                <td>{location}</td>
                <td>{assignedDate}</td>
                <td>{discardedDate}</td>
                <td>{lastReturnedDate}</td>

                <td>
                    <Link to={`/assets/edit/${assetID}`}>
                        <button className="btn btn-outline btn-sm shadow">
                            Edit
                        </button>
                    </Link>
                </td>
            </tr>
        </>
    )
}