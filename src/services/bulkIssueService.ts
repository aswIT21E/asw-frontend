import { token } from "./";

export const bulkIssue = async (data: any, navigate: (path: string) => void) =>  {
    const issuesArray = data.split('\n');
    const bulkIssues = issuesArray.map((Subjectissue: string) => ({
      subject: Subjectissue,
      description: 'ISSUE',
      status: 'new',
      type: 'bug',
      severity: 'minor',
      priority: 'low',
    }));

    try {
        await fetch('http://api.asw-fib.net/issues/bulk', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issues: bulkIssues }),
      }).then(
        response => {
             console.log(response);
             navigate('/');

        })
    } catch (error) {
      console.log('Error creating issue:', error);
    }
  };
  