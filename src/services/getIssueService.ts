import { token } from ".";
export const getIssue = async (id: string) => {
    try {
      const response = await fetch(`http://api.asw-fib.net/issues/info/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      const fetchedIssue = await response.json();
      return fetchedIssue;
    } catch (error) {
      console.log('Error fetching issue:', error);
      return null;
    }
  };
  