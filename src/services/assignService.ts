export const assignIssue = async (id: string, user: string) => {
    var urlencoded = new URLSearchParams();
    urlencoded.append("userId", user);
      try {
        const response = await fetch(`http://api.asw-fib.net/issues/${id}/assign`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
            'Content-Type': "application/x-www-form-urlencoded"
          },
          method: 'POST',
          body: urlencoded,
        });
        const fetchedIssue = await response.json();
        return fetchedIssue;
      } catch (error) {
        console.log('Error fetching issue:', error);
        return null;
      }
};
    