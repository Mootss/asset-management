import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Staff from "./pages/Staff"
import Assets from "./pages/Assets"
import AssetsNew from "./pages/AssetsNew"
import AssetsEdit from "./pages/AssetsEdit"

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/assets" element={<Assets />} />
                    <Route path="/assets/new" element={<AssetsNew />} />
                    <Route path="/assets/edit/:id" element={<AssetsEdit />} />
                </Routes>
            </Navbar>
        </>
    )
}
// #44F41_$3CR3T
export default App
