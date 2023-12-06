import {React, response} from "react";

document.getElementById("LoginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents the default form submission

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.message); // Log success message or handle it accordingly
            // Redirect to another page or perform actions after successful login
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error, display error message, or perform actions accordingly
        });
});

document.getElementById("RegisterForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents the default form submission

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.message); // Log success message or handle it accordingly
            // Redirect to another page or perform actions after successful registration
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle error, display error message, or perform actions accordingly
        });
});
