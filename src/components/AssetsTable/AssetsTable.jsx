export default function AssetsTable({ children }) {
    return (
        <>
                <div className="overflow-x-auto">
                    <table className="table table-md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Purchased Date</th>
                                <th>Status</th>
                                <th>Assigned Staff</th>
                                <th>Location</th>
                                <th>Assigned Date</th>
                                <th>Discarded Date</th>
                                <th>Last Returned Date</th>
                                <th></th>

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
