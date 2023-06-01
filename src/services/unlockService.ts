import { token } from ".";
export const unlockIssue = async (id: string) => {
    try {
      const response = await fetch(`http://api.asw-fib.net/issues/${id}/unlock-issue`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': "application/x-www-form-urlencoded"
        },
        method: 'PUT',
      });
      const fetchedIssue = await response.json();
      return fetchedIssue;
    } catch (error) {
      console.log('Error fetching issue:', error);
      return null;
    }
  };
  