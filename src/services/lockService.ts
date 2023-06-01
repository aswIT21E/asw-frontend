export const lockIssue = async (id: string, reason: string) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("reason", reason);
    try {
      const response = await fetch(`http://api.asw-fib.net/issues/${id}/lock-issue`, {
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
      console.log('Error fetching issue:', error);
      return null;
    }
  };
  