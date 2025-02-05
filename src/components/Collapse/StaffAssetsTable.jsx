export default function StaffAssetsTable({ children }) {

    return (
        <>
            <h1 className="font-bold text-md underline underline-offset-8 my-2 opacity-80">Currently Assigned</h1>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Asset</th>
                            <th>Location</th>
                            <th>Purchased Date</th>
                            <th>Assigned Date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    )
}

