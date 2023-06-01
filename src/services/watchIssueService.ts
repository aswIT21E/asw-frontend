export const watchIssue = async (id: string, users: string[]) => {
      try {
        const response = await fetch(`http://api.asw-fib.net/issues/${id}/add-watchers`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ users: users }),
        });
        const fetchedIssue = await response.json();
        return fetchedIssue;
      } catch (error) {
        console.log('Error fetching issue:', error);
        return null;
      }
};
    