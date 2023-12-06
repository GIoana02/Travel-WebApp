import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

function AddImg()  {
    const  [selectedFile, setSelectedFile] = useState(null);

    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append(
            "file", 
            selectedFile, 
            selectedFile.name
        );
    

        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch("http://localhost:8000/upload/", requestOptions)
        .then(response => response.json())
        .then(function(response){
            console.log(response)
        })
    }

    return (
        <div>
            <div className="header1">
                <nav id="navbar" className="nav-white">
                    <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                    <ul className="nav-links">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/Offers">OFFERS</Link></li>
                        <li><Link to="/Orders">ORDERS</Link></li>
                        <li><Link to="/Favorites">FAVORITES</Link></li>
                        <li><Link to="/Account">ACCOUNT</Link></li>  
                    </ul>
                    <Link to="/Login" className="register-btn">Log In</Link>
                </nav>
                <div className="form">
                    <h1>Upload Image</h1>
                    <form>
                        <fieldset>
                            <input onChange={fileChangeHandler} name="image" type="file" accept=".jpeg, .png, .jpg"></input>
                        </fieldset>
                        <button onClick={handleSubmit}>Upload</button>
                    </form>
                    
                    <div className="container">
                        <div className="footer">
                            <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                            <hr />
                        <p>Copyright © 2023, Trip Planner.</p>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default AddImg;