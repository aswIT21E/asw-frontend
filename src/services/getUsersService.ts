export const fetchUsers = async () => {
    try {
      const response = await fetch('http://api.asw-fib.net/users', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
        },
      });
      const fetchedIssues = await response.json();
      return fetchedIssues;
    } catch (error) {
      console.log('Error fetching issues:', error);
      return [];
    }
  };
  