import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function AuthorLayout(){
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default AuthorLayout;