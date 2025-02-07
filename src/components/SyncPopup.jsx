export default function SyncPopup() {

    return (
        <>
          
                <div role="alert" className="p-2 border border-gray-200 bg-gray-100 m-4 rounded-lg flex fixed bottom-0 shadow-md z-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="ml-2">Syncing...</span>
                </div>
            
        </>
    )
}