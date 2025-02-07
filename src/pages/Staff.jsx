import StaffCollapse from "../components/Collapse/StaffCollapse"
import { useQuery } from "@tanstack/react-query"
import SyncPopup from "../components/SyncPopup"
import { fetchAPI } from "../utils/API"

export default function Staff() {
    const { isLoading, data: staffData, isError, error, isFetching } = useQuery({
        queryKey: ["staff"],
        queryFn: () => fetchAPI({
            url: "/staff"
        }),
        staleTime: 1000 * 60 * 15
    })

    if (isError) {
        return <h1>ERROR FETCHING DATA: {error.message}</h1>
    }

    return (
        <>
            {isFetching && (<SyncPopup />)}

            {isLoading ? (
                <div className="flex justify-center items-center mt-44">
                    <span className="loading loading-spinner loading-lg"></span>
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