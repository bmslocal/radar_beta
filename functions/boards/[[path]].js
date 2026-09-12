// Cloudflare Pages Function: /boards/[[path]].js
// Provides transparent compatibility with Firebase RTDB format:
// 1. PUT /boards/:mac.json  -> Save board IP, MAC, TS
// 2. GET /boards/:mac.json  -> Get specific board
// 3. GET /boards.json       -> Get all boards / freshest board

export async function onRequest(context) {
    const { request, env, params } = context;
    const url = new URL(request.url);

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const kv = env.BMS_KV;
    const pathParts = params.path || [];
    let requestedDoc = pathParts.join('/');
    requestedDoc = requestedDoc.replace(/\.json$/, ''); // strip .json

    // --- PUT or POST: Save Board ---
    if (request.method === 'PUT' || request.method === 'POST') {
        try {
            const body = await request.json();
            const rawMac = body.mac || requestedDoc || 'default';
            const cleanMac = rawMac.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            const ip = (body.ip || '').trim();
            const version = (body.version || '').trim();

            if (!ip) {
                return new Response(JSON.stringify({ error: 'Missing IP' }), { status: 400, headers: corsHeaders });
            }

            const record = {
                mac: rawMac,
                ip: ip,
                version: version,
                ts: Date.now()
            };

            if (kv) {
                await kv.put(`board:${cleanMac}`, JSON.stringify(record), { expirationTtl: 86400 });
                await kv.put(`latest_board`, JSON.stringify({ [cleanMac]: record }), { expirationTtl: 86400 });
            }

            return new Response(JSON.stringify(record), { headers: corsHeaders });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
        }
    }

    // --- GET: Retrieve Board(s) ---
    if (request.method === 'GET') {
        if (requestedDoc && requestedDoc !== '') {
            // Specific board requested (e.g. /boards/AABBCCDDEEFF.json)
            const clean = requestedDoc.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (kv) {
                const data = await kv.get(`board:${clean}`);
                if (data) {
                    return new Response(data, { headers: corsHeaders });
                }
            }
            return new Response('null', { headers: corsHeaders });
        } else {
            // Global query /boards.json
            if (kv) {
                const latest = await kv.get(`latest_board`);
                if (latest) {
                    return new Response(latest, { headers: corsHeaders });
                }
            }
            return new Response('{}', { headers: corsHeaders });
        }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
}
