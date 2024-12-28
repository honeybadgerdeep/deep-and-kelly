<script>
    import { MANDAP_EVENT, INDIAN_RECEPTION_EVENT, loadTypeformData } from '$lib/data/typeform';
    import { guestStore } from '../../stores/firestore';

    import { onMount } from 'svelte';
    import RsvpCategory from './RSVPCategory.svelte';

    let loadingData = true;
    let allInvitedGuests = [];
    let indianOnlyGuests = {};
    let westernGuestIds = [];
    let mandapGuestIds = [];
    let indianReceptionGuestIds = [];
    let allGuests = {};
    let allGuestsByGroup = {};

    $: numberOfGroups = Object.keys(allGuestsByGroup).length;
    $: numberOfGuests = Object.keys(allGuests).length;

    $: normalizeGuests = () => {
        const all = {};
        let guestCt = 0;

        allInvitedGuests?.forEach((guest) => {
            if (guest.rsvpSubmitted) {
                guestCt++;
                const normalizedGuestData = {
                    guestId: guestCt,
                    name: guest.firstName + ' ' + guest.lastName,
                    western: guest.attendance.western.attending,
                    mandap: guest.attendance.indian.attending,
                    indianReception: guest.attendance.indian.attending
                };

                allGuests[normalizedGuestData.guestId] = normalizedGuestData;

                if (guest.attendance.western.attending) {
                    westernGuestIds = [...westernGuestIds, normalizedGuestData.guestId];
                }

                if (guest.attendance.indian.attending) {
                    mandapGuestIds = [...mandapGuestIds, normalizedGuestData.guestId];
                    indianReceptionGuestIds = [...indianReceptionGuestIds, normalizedGuestData.guestId];
                }

                if (guest.groupId) {
                    if (!all[guest.groupId]) {
                        all[guest.groupId] = [];
                    }
                    all[guest.groupId] = [...all[guest.groupId], normalizedGuestData];
                    normalizedGuestData.groupId = guest.groupId;
                } else {
                    const singleFirebaseGuestId = `singleFirebaseGuest-${guestCt}`;
                    all[singleFirebaseGuestId] = [normalizedGuestData];
                    normalizedGuestData.groupId = singleFirebaseGuestId;
                }
            }
        });

        if (indianOnlyGuests) {
            const mandap = indianOnlyGuests[MANDAP_EVENT];
            const indianReception = indianOnlyGuests[INDIAN_RECEPTION_EVENT];

            if (mandap) {
                Object.keys(mandap).forEach((guestGroupId) => {
                    if (!all[guestGroupId]) {
                        all[guestGroupId] = [];
                    }

                    mandap[guestGroupId]?.forEach((guest) => {
                        const normalizedGuestData = {
                            guestId: ++guestCt,
                            groupId: guestGroupId,
                            name: guest.Name,
                            western: false,
                            mandap: true,
                            indianReception: true
                        };

                        all[guestGroupId] = [...all[guestGroupId], normalizedGuestData];
                        allGuests[normalizedGuestData.guestId] = normalizedGuestData;
                        mandapGuestIds = [...mandapGuestIds, normalizedGuestData.guestId];
                        indianReceptionGuestIds = [...indianReceptionGuestIds, normalizedGuestData.guestId];
                    });
                });
            }

            if (indianReception) {

                Object.keys(indianReception).forEach((guestGroupId) => {
                    if (!all[guestGroupId]) {
                        all[guestGroupId] = [];
                    }

                    indianReception[guestGroupId]?.forEach((guest) => {
                        const normalizedGuestData = {
                            guestId: ++guestCt,
                            groupId: guestGroupId,
                            name: guest.Name,
                            western: false,
                            mandap: false,
                            indianReception: true
                        };

                        all[guestGroupId] = [...all[guestGroupId], normalizedGuestData];
                        allGuests[normalizedGuestData.guestId] = normalizedGuestData;
                        indianReceptionGuestIds = [...indianReceptionGuestIds, normalizedGuestData.guestId];
                    });
                });
            }
        }

        allGuestsByGroup = all;
    };

    onMount(() => {
        guestStore.subscribe((guests) => {
            allInvitedGuests = guests;
        })
        loadData();
    });

    const loadData = async () => {
        const guestsPromise = guestStore.getGuests();
        const indianOnlyGuestsPromise = loadTypeformData();

        Promise.all([guestsPromise, indianOnlyGuestsPromise])
            .then(([_, indianGuests]) => {
                indianOnlyGuests = indianGuests;
                loadingData = false;
                normalizeGuests();
            });
    }
</script>

<div id="rsvp-summary">
    {#if loadingData}
        <p>Loading...</p>
    {:else}
        <p>
            Number of RSVP'd Guests: {numberOfGuests}
        </p>
        <p>
            Number of Groups: {numberOfGroups}
        </p>
        <div id='rsvp-category-container'>
            <RsvpCategory
                name="Western"
                allGuests={allGuests}
                guestIds={westernGuestIds}
            />
            <RsvpCategory
                name="Mandap"
                allGuests={allGuests}
                guestIds={mandapGuestIds}
            />
            <RsvpCategory
                name="Indian Reception"
                allGuests={allGuests}
                guestIds={indianReceptionGuestIds}
            />
        </div>
    {/if}
</div>
