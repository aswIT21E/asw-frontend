export const login = async (username: string, password: string, setAuthenticated: (value: boolean) => void) => {
    try {
        const response = await fetch('http://api.asw-fib.net/users/login' , {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setAuthenticated(true);
        
    }catch (error) {
        console.log("Error: ", error);
    }
}