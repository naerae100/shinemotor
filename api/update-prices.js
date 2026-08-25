export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // Verify the password passed in the Authorization header
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const password = authHeader.split(' ')[1];
  if (password !== process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  if (!process.env.GITHUB_PAT) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration: GITHUB_PAT is missing' }), { status: 500 });
  }

  try {
    const body = await req.json();
    const rows = body.rows;
    if (!rows || !Array.isArray(rows)) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    // Format the current date
    const date = new Date();
    const updatedDate = date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });

    const newPricesJson = {
      meta: {
        currency: 'AUD',
        updated: updatedDate
      },
      rows: rows
    };

    // We need to commit this to GitHub.
    // First, get the current SHA of the file we want to update.
    const repo = 'naerae100/shinemotor'; // Replace with their repo if it's different. Wait! I saw they pushed to `naerae100/shinemotor.git`.
    const filePath = 'src/content/prices.json';
    
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      const err = await getRes.json();
      return new Response(JSON.stringify({ error: 'Failed to fetch current file from GitHub', details: err }), { status: 500 });
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // Convert new content to base64
    // TextEncoder + btoa is needed for Edge functions
    const contentStr = JSON.stringify(newPricesJson, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(contentStr)));

    // Push the update to GitHub
    const updateRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${process.env.GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Updated prices via Admin Dashboard (${updatedDate})`,
        content: base64Content,
        sha: sha,
        branch: 'master' // or main
      })
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return new Response(JSON.stringify({ error: 'Failed to commit changes to GitHub', details: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', message: err.message }), { status: 500 });
  }
}
