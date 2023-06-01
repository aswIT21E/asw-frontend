export const addAttachment = async (id: string, file: any ) => {


  const formData = new FormData();
  formData.append('file', file);

  await fetch(`http://api.asw-fib.net/issues/${id}/addAttachment`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
            'Content-Type': 'application/json'
                  },
            method: 'POST',
            body: formData,
          })
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
      };


