const RAILWAYS_URL = 'https://api-production.b38b.up.railway.app';

export const grabImages = async (groupId, passphrase) => {
    try {
        const response = await fetch(`${RAILWAYS_URL}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupId,
                passkey: passphrase
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying passphrase:', error);
        return false;
    }
}