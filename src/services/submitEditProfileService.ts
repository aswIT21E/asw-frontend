import { token } from ".";

export const submitEditProfile = async (data: any, image: FormData) => {
    await fetch(`http://api.asw-fib.net/myProfile/${token}/edit/submit`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => {
        return fetch('http://api.asw-fib.net/user/editProfilePic', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer '+ token
            },
            body: image
        }).catch(error => {
            console.error(error);
        })
    })
}