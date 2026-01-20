
import crypto from 'crypto';
import https from 'https';

/**
 * Hash data using SHA-256
 * @param {string} data - Data to hash
 * @returns {string} - SHA-256 hash
 */
export const hashData = (data) => {
    if (!data) return null;
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

/**
 * Send Event to Meta Conversions API
 * @param {Object} eventData - The event data payload
 * @returns {Promise<Object>} - API response
 */
export const sendMetaEvent = async (eventData) => {
    const PIXEL_ID = process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error("Meta CAPI Missing Credentials");
        throw new Error("Missing Meta Pixel ID or Access Token");
    }

    const payload = {
        data: [
            {
                event_name: eventData.eventName,
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventData.eventId,
                action_source: "website",
                user_data: {
                    em: eventData.userData.email ? [hashData(eventData.userData.email)] : [],
                    ph: eventData.userData.phone ? [hashData(eventData.userData.phone)] : [],
                    client_ip_address: eventData.userData.clientIp,
                    client_user_agent: eventData.userData.userAgent,
                    fbc: eventData.userData.fbc, // Click ID
                    fbp: eventData.userData.fbp  // Browser ID
                },
                custom_data: eventData.customData || {},
                event_source_url: eventData.eventSourceUrl
            }
        ]
        // test_event_code: "TEST58622" // UNCOMMENT FOR TESTING ONLY
    };

    // Add test_event_code if provided in payload (for flexible testing)
    if (eventData.testEventCode) {
        payload.data[0].test_event_code = eventData.testEventCode;
    }

    const dataString = JSON.stringify(payload);

    const options = {
        hostname: 'graph.facebook.com',
        path: `/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseBody);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsedData);
                    } else {
                        console.error('Meta CAPI Error Response:', parsedData);
                        reject(parsedData);
                    }
                } catch (e) {
                    reject({ error: 'Invalid JSON response', body: responseBody });
                }
            });
        });

        req.on('error', (e) => {
            console.error('Meta CAPI Request Error:', e);
            reject(e);
        });

        req.write(dataString);
        req.end();
    });
};
