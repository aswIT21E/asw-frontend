export const modifyIssue = async (id: string, parameter: string, newValue: string) => {
    try {
      const response = await fetch(`http://api.asw-fib.net/issues/${id}/modifyIssue`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
        },
        method: 'PUT',
        body: JSON.stringify({
            parameter: parameter,
            newValue: newValue,
        }),
      });
      const fetchedIssue = await response.json();
      return fetchedIssue;
    } catch (error) {
      console.log('Error fetching issue:', error);
      return null;
    }
  };
  