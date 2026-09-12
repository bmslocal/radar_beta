// Cloudflare Pages Function: /api/beacon and /api/boards
// Supports:
// 1. POST /api/beacon { mac, ip, version }
// 2. GET /api/beacon?mac=XXXXX or GET /api/boards or GET /api/boards/:mac

export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    // CORS headers for all responses
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    // Use Cloudflare KV if bound (env.BMS_KV), otherwise fallback to edge in-memory / cache
    const kv = env.BMS_KV;

    // --- POST: ESP32 Registration ---
    if (request.method === 'POST') {
        try {
            const body = await request.json();
            const rawMac = body.mac || body.id || 'default';
            const cleanMac = rawMac.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            const ip = (body.ip || '').trim();
            const version = (body.version || '').trim();

            if (!ip) {
                return new Response(JSON.stringify({ error: 'Missing IP' }), { status: 400, headers: corsHeaders });
            }

            const record = {
                mac: rawMac,
                cleanMac: cleanMac,
                ip: ip,
                version: version,
                ts: Date.now()
            };

            if (kv) {
                // Key by clean MAC, TTL = 24 hours (86400 seconds)
                await kv.put(`board:${cleanMac}`, JSON.stringify(record), { expirationTtl: 86400 });
                // Also maintain recent boards index if desired
                await kv.put(`latest_board`, JSON.stringify(record), { expirationTtl: 86400 });
            }

            return new Response(JSON.stringify({ ok: true, registered: cleanMac, ip: ip }), { headers: corsHeaders });
        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
        }
    }

    // --- GET: Radar Query ---
    if (request.method === 'GET') {
        const queryMac = url.searchParams.get('mac') || url.searchParams.get('id');
        
        if (queryMac) {
            const clean = queryMac.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (kv) {
                const data = await kv.get(`board:${clean}`);
                if (data) {
                    return new Response(data, { headers: corsHeaders });
                }
            }
            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders });
        }

        // Return latest active board if no specific MAC requested
        if (kv) {
            const latest = await kv.get(`latest_board`);
            if (latest) {
                return new Response(latest, { headers: corsHeaders });
            }
        }

        return new Response(JSON.stringify({}), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
}
