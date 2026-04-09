import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ReaderLayout(){
    return(
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default ReaderLayout;