import { Link } from "react-router-dom"

export default function Navbar({ children }) {
    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar shadow-md w-full">
                        <div className="flex-none sm:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">

                            <Link className="flex" to="/">
                                <img className="size-9 mr-3" src="/fai-logo.png" alt="" />
                                <p className="font-bold text-2xl">Haafai <span className="opacity-80 font-normal text-xl">- Asset Management App</span></p>
                            </Link>
                        </div>
                        <div className="hidden flex-none sm:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar */}
                                <li><Link to="/staff">Staff</Link></li>
                                <li><Link to="/assets">Assets</Link></li>
                            </ul>
                        </div>
                    </div>
                    { children }
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar */}
                        <li><Link to="/staff">Staff</Link></li>
                        <li><Link to="/assets">Assets</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}