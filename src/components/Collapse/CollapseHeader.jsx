export default function CollapseHeader({ name, NID, department, avatarURL }) {

    return (
        <>
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                            src={avatarURL}
                            alt="Staff Avatar"
                        />
                    </div>
                </div>
                <div>
                    <div className="font-bold">
                        {name}
                        <p className="opacity-65 badge badge-sm ml-3 bg-gray-300"> {NID}</p>
                    </div>
                    <div className="text-sm opacity-60">
                        {department}
                    </div>
                </div>
            </div>
        </>
    )
}
