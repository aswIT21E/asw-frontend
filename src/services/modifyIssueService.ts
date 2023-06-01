import { token } from ".";
export const modifyIssue = async (id: string, parameter: string, newValue: string) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("parameter", parameter);
  urlencoded.append("newValue", newValue);
    try {
      const response = await fetch(`http://api.asw-fib.net/issues/${id}/editIssue`, {
        headers: {
          Authorization: 'Bearer '+ token,
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
  