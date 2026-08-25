export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const password = authHeader.split(' ')[1];
  
  // Check if the password matches the Vercel environment variable
  if (password !== process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
