export const createComment = async (data: any, navigate: (path: string) => void) =>  {
    console.log(data);
    try {
        await fetch(`http://api.asw-fib.net/issues/${data.id}/new-comment`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
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
  