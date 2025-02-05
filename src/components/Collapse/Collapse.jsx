export default function Collapse({ header, content }) {

    return (
        <>
            <div className="collapse collapse-arrow join-item border-base-300 border hover:bg-gray-50 transition">
                <input type="checkbox" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">
                    {header}
                </div>

                <div className="collapse-content">
                    {content}
                </div>
            </div>
        </>
    )
}