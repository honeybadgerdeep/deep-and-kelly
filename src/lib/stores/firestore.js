// firestore.js (rename to database.js)
import { writable } from 'svelte/store';
import { ref, get, query, orderByChild, update } from 'firebase/database';  // Change imports
import { db } from '../firebase/firebase';

function createGuestStore() {
    const { subscribe, set, update: updateStore } = writable([]);

    return {
        subscribe,
        // Search guests
        searchGuests: async (searchTerm) => {
            if (!searchTerm || searchTerm.trim() === '') {
                set([]);
                return;
            }

            try {
                // Get all guests
                const guestsRef = ref(db, 'guests');
                const snapshot = await get(guestsRef);
                
                if (snapshot.exists()) {
                    const guests = [];
                    const guestsData = snapshot.val();
                    
                    // Filter guests by name
                    Object.entries(guestsData).forEach(([id, guest]) => {
                        const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
                        if (guest.rsvpSubmitted != true && fullName.includes(searchTerm.toLowerCase())) {
                            guests.push({ id, ...guest });
                        }
                    });

                    // For each guest, get their group members who haven't RSVP'd
                    const results = await Promise.all(guests.map(async (guest) => {
                        let groupMembers = [];
                        if (guest.groupId) {
                            const groupRef = ref(db, 'guests');
                            const groupSnapshot = await get(groupRef);
                            
                            if (groupSnapshot.exists()) {
                                const allGuests = groupSnapshot.val();
                                groupMembers = Object.entries(allGuests)
                                    .map(([id, data]) => ({ id, ...data }))
                                    .filter(member => 
                                        member.groupId === guest.groupId && 
                                        member.id !== guest.id && 
                                        !member.rsvpSubmitted
                                    );
                            }
                        }
                        return {
                            mainGuest: guest,
                            groupMembers
                        };
                    }));

                    set(results);
                } else {
                    set([]);
                }
            } catch (error) {
                console.error('Error searching guests:', error);
                set([]);
            }
        },
        // Update guest RSVP
        updateRSVP: async (rsvpData) => {
            try {
                const updates = rsvpData.reduce((acc, guest) => {
                    acc[`guests/${guest.id}/attendance/western/attending`] = guest.western ?? false;
                    acc[`guests/${guest.id}/attendance/indian/attending`] = guest.indian ?? false;
                    acc[`guests/${guest.id}/dietaryRestrictions`] = guest.dietaryRestrictions;
                    acc[`guests/${guest.id}/comments`] = guest.comments;
                    acc[`guests/${guest.id}/rsvpSubmitted`] = true;
                    return acc;
                }, {});
                
                await update(ref(db), updates);
                return true;
            } catch (error) {
                console.error('Error updating RSVP:', error);
                return false;
            }
        },
        getGuests: async () => {
            try {
                const guestsRef = ref(db, 'guests');
                const snapshot = await get(guestsRef);
                if (snapshot.exists()) {
                    const guests = [];
                    const guestsData = snapshot.val();
                    Object.entries(guestsData).forEach(([id, guest]) => guests.push({ id, ...guest }));
                    set(guests);
                } else {
                    set([]);
                }
            } catch (error) {
                console.error('Error getting guests:', error);
                set([]);
            }
        }
    };
}

export const guestStore = createGuestStore();