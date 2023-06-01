import { token } from ".";

export const getUserInfo = async () => {
    try {
        const user = await fetch('http://api.asw-fib.net/users/profile',{
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const fetchedUser = await user.json();
        return fetchedUser;
    } catch (error) {
        console.error(error);
    }
}