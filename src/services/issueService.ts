import { token } from ".";


export const fetchIssues = async () => {
  try {
    const response = await fetch('http://api.asw-fib.net/issues', {
      headers: {
        Authorization: 'Bearer '+ token,
      },
    });
    const fetchedIssues = await response.json();
    return fetchedIssues;
  } catch (error) {
    console.log('Error fetching issues:', error);
    return [];
  }
};
