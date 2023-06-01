import { token } from ".";
export const createComment = async (data: any, navigate: (path: string) => void) =>  {
    console.log(data);
    try {
        await fetch(`http://api.asw-fib.net/issues/${data.id}/new-comment`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(
        response => {
             console.log(response);

        })
    } catch (error) {
      console.log('Error creating issue:', error);
    }
  };
  