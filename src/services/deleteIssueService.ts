export const deleteIssue = async (id: string) => {
      try {
        const response = await fetch(`http://api.asw-fib.net/issues/${id}/remove`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
            'Content-Type': "application/x-www-form-urlencoded"
          },
          method: 'DELETE',
        });
        const fetchedIssue = await response.json();
        return fetchedIssue;
      } catch (error) {
        console.log('Error fetching issue:', error);
        return null;
      }
    };
    