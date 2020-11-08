let statusCode, statusText;

export const apiCall = async ({ url, method, token, body, params }) => {
    const response = await fetch(process.env.REACT_APP_API + url, {
        method: method, //providing the method.
        headers: { // providing the headers.
            "Content-Type": 'application/json',
            "Authorization": `Token ${token}`, // providing the auth token
        },
        body: JSON.stringify(body), // passing the expected data in body
    });
    if (!response.ok) {
        if (response.status === 500) {
            statusCode = response.status;
            statusText = response.statusText;
            let responseData = { statusCode, statusText };
            return responseData; // returning the response data.
        } else {
            statusCode = response.status; // setting up the status code.
            const data = await response.json(); // getting the response data.
            let responseData = { data, statusCode };
            return responseData; // returning the response data.
        }
    } else {
        statusCode = response.status; // setting up the status code.
        const data = await response.json(); // getting the response data.
        let responseData = { data, statusCode };
        return responseData; // returning the response data.
    }
};