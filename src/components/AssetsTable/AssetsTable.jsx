export default function AssetsTable({ children }) {
    return (
        <>
            <div className="m-4 border border-gray-300 rounded-md shadow-md">
                <div className="flex justify-between m-4 mx-6">
                    <h1 className="font-bold text-2xl underline underline-offset-8">Assets</h1>
                    <button className="btn btn-neutral btn-sm text-white shadow-md">Add New Asset</button>
                </div>
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
            </div>

        </>
    )
}
