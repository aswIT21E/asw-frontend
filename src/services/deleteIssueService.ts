import { token } from ".";
export const deleteIssue = async (id: string) => {
      try {
        const response = await fetch(`http://api.asw-fib.net/issues/${id}/remove`, {
          headers: {
            Authorization: 'Bearer ' + token,
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
    