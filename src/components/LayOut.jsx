import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header"

export default function Layout() {
    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate("/"); // Navigate to the homepage
      };
    return (
        <div>
            <div style={{cursor: "pointer"}} onClick={handleLogoClick}>
            <Header />
            </div>

            <main>
                <Outlet /> 
            </main>
        </div>
    );
}
