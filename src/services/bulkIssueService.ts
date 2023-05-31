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
    console.log(bulkIssues)
    try {
        await fetch('http://api.asw-fib.net/issues/bulk', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsc2EiLCJpYXQiOjE2ODUzNTMyNDd9.sOGIHXk-CTXi3t9Z5mHCEKXBo-_kOzljhmTgLqPOj0E',
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
  