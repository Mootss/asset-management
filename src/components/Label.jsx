export default function Label({ children, name }) {

    return (
        <>
            <label className="form-control w-full max-w-xs mt-3">
                <div className="label">
                    <span className="label-text">{name}</span>
                </div>
                {children}
            </label>
        </>
    )
}