import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

export const LoginLogout = () => {
    const navigate = useNavigate();
    const isLogged = document.cookie.includes("loggedIn=true");
    
    const handleClick = () => {
        if (isLogged) {
            document.cookie = "loggedIn=false;max-age=0";
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <Button onClick={handleClick}>
            {isLogged ? "Logout" : "Login"}
        </Button>
    );
}