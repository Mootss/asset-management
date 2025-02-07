export default function Card({ children }) {
    return (
        <>
            <div className="m-4 pb-4 border border-gray-300 rounded-md shadow-md p-2">
                {children}
            </div>
        </>
    )
}
