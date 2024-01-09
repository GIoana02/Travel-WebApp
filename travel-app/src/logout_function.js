import api from "./api";

export async function logoutUser() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for logout
            const response = await api.post('user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('token');
            if (response.ok) {
                console.log("Logged out successfully");
                 // Remove token from localStorage
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    } else {
        console.log("No token found in local storage");
    }
}
