import { token } from ".";


export const createIssue = async (data: any, navigate: (path: string) => void) =>  {
    console.log(data);
    try {
        await fetch('http://api.asw-fib.net/issues/create', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(
        response => {
             console.log(response);
             navigate('/');

        })
    } catch (error) {
      console.log('Error creating issue:', error);
    }
  };
  