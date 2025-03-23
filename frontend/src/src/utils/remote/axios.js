
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v0.1"; 
axios.defaults.headers = {
"Content-Type": "application/json",
};

export const request = async ({ method, route, body }) => {
    try {
    const response = await axios.request({
        method, 
        url: route,
        data: body,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`, 
            'Content-Type': 'application/json',  
        }
    });

    return {
        success: true,
        message: response.data.message,
        data:response.data.data
    }
} catch (error) {
    return {
        success: false,
        message: error.message,
    };
}
};
