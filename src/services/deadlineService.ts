export const updateDeadline = async (id: string, deadline: Date) => {
  var urlencoded = new URLSearchParams();
  const date = new Date(deadline);
  
  console.log(date)

  urlencoded.append("deadline", date.toISOString() );

    try {
      const response = await fetch(`http://api.asw-fib.net/issues/${id}/updateDeadline`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
          'Content-Type': "application/x-www-form-urlencoded"
        },
        method: 'PUT',
        body: urlencoded,
      });
      const fetchedIssue = await response.json();
      return fetchedIssue;
    } catch (error) {
      console.log('Error fetching deadline:', error);
      return null;
    }
  };
  