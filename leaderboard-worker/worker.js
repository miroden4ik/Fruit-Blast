export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') {
      return handleCors(new Response(null, { status: 204 }));
    }

    try {
      if (path === '/leaderboard' && method === 'GET') {
        return handleCors(await getLeaderboard(env));
      }
      if (path === '/submit' && method === 'POST') {
        return handleCors(await submitScore(request, env));
      }
      return handleCors(new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }));
    } catch (err) {
      console.error('Request error:', err);
      return handleCors(new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }));
    }
  },
};

function handleCors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

const CLIENT_SECRET = ''; // TODO: Вставьте сюда Client Secret из настроек VK Mini App

async function verifyVKSignature(paramsStr) {
  if (!CLIENT_SECRET) {
    console.warn('[WARNING] CLIENT_SECRET не установлен. Подпись НЕ проверяется, принимаются все запросы!');
    return true;
  }

  try {
    const params = new URLSearchParams(paramsStr);
    const sign = params.get('sign');
    if (!sign) return false;

    const ordered = [...params.entries()]
      .filter(([k]) => k !== 'sign')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const keyData = new TextEncoder().encode(CLIENT_SECRET);
    const msgData = new TextEncoder().encode(ordered);

    const cryptoKey = await crypto.subtle.importKey(
      'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const rawSig = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    const hashHex = btoa(String.fromCharCode(...new Uint8Array(rawSig)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return hashHex === sign;
  } catch (e) {
    console.error('Signature verification error:', e);
    return false;
  }
}

async function getLeaderboard(env) {
  const kv = env.FRUIT_BLAST_LB;
  const cached = await kv.get('_index', { type: 'json' });
  if (cached && Array.isArray(cached)) {
    return new Response(JSON.stringify({ success: true, leaderboard: cached.slice(0, 100) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const allUsers = await scanAllUsers(kv);
  const top = allUsers
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  await kv.put('_index', JSON.stringify(top), { expirationTtl: 300 });

  return new Response(JSON.stringify({ success: true, leaderboard: top }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function scanAllUsers(kv) {
  const results = [];
  let cursor = null;
  const prefix = 'user:';

  do {
    const list = await kv.list({ prefix, cursor, limit: 1000 });
    for (const key of list.keys) {
      const user = await kv.get(key.name, { type: 'json' });
      if (user && typeof user.score === 'number') {
        results.push(user);
      }
    }
    cursor = list.cursor;
  } while (cursor);

  return results;
}

async function submitScore(request, env) {
  const kv = env.FRUIT_BLAST_LB;
  let payload;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { vk_user_id, first_name, last_name, photo_100, score, vk_sign_params } = payload || {};

  if (!vk_user_id || typeof score !== 'number' || score < 0) {
    return new Response(JSON.stringify({ success: false, error: 'Missing or invalid fields: vk_user_id, score' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (vk_sign_params) {
    const valid = await verifyVKSignature(vk_sign_params);
    if (!valid) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid VK signature' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else if (CLIENT_SECRET) {
    return new Response(JSON.stringify({ success: false, error: 'vk_sign_params required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userKey = `user:${vk_user_id}`;
  const existing = await kv.get(userKey, { type: 'json' });
  const existingScore = existing?.score || 0;

  if (existing && score <= existingScore) {
    return new Response(JSON.stringify({
      success: true,
      updated: false,
      score: existingScore,
      message: 'New score is not higher than current record',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const record = {
    vk_user_id,
    first_name: first_name || 'Игрок',
    last_name: last_name || '',
    photo_100: photo_100 || '',
    score,
    updated_at: Date.now(),
  };

  await kv.put(userKey, JSON.stringify(record));
  await kv.delete('_index');

  return new Response(JSON.stringify({
    success: true,
    updated: true,
    previous_score: existingScore,
    new_score: score,
    record,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
