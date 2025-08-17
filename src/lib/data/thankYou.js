const RAILWAYS_URL = 'https://api-production-b38b.up.railway.app';

export const validateGroupId = async (groupId) => {
    const response = await fetch(`${RAILWAYS_URL}/validate-group-id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: groupId
    });

    if (!response.ok) {
        throw new Error('Validating group id failed');
    }
}

export const grabImages = async (groupId, passphrase) => {
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

    if (!response.ok) {
        throw new Error('Grabbing images failed');
    }

    const data = await response.json();
    return data;
}

export const grabImagesAsZip = async (groupId, passphrase) => {
    const response = await fetch(`${RAILWAYS_URL}/images-zip`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId,
            passkey: passphrase
        }),
    });

    if (!response.ok) {
        throw new Error('Grabbing images failed');
    }

    const data = await response.blob();
    return data;
}