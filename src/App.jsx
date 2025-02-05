import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Staff from "./pages/Staff"
import Assets from "./pages/Assets"

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/assets" element={<Assets />} />
                </Routes>
            </Navbar>
        </>
    )
}
// #44F41_$3CR3T
export default App
