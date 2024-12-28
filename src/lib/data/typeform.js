// Call an endpoint and return the response as JSON:

const RAILWAYS_URL = 'https://deep-and-kelly-rsvp-typeform-production.up.railway.app/';

export const verifyUserPassphrase = async (passphrase) => {
    try {
        const response = await fetch(`${RAILWAYS_URL}api/attempt_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passPhrase: passphrase }),
        });
        const data = await response.json();
        return data.status === 'success';
    } catch (error) {
        console.error('Error verifying passphrase:', error);
        return false;
    }
}

export const loadTypeformData = async () => {
    try {
        const response = await fetch(`${RAILWAYS_URL}api/guests`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading typeform data:', error);
        return null;
    }
}

export const MANDAP_EVENT = 0;
export const INDIAN_RECEPTION_EVENT = 1;