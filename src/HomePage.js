import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Link to="/pizza"><button>Pizza?</button></Link>
        </div>
    )
}

export default HomePage;