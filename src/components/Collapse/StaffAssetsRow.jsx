export default function StaffAssetsRow({ no, asset, location, purchasedDate, assignedDate }) {

    return (
        <>
            <tr>
                <th>{no}</th>
                <td>{asset}</td>
                <td>{location}</td>
                <td>{purchasedDate}</td>
                <td>{assignedDate}</td>
            </tr>
        </>
    )
}

