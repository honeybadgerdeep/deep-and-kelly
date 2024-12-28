<script>
    export let name;
    export let allGuests;
    export let guestIds;
    import Separator from './Separator.svelte';

    let filter = '';

    $: filteredGuestIds = guestIds.filter((guestId) => {
        if (filter === '') return true;
        const guest = allGuests[guestId];
        return guest.name.toLowerCase().includes(filter.toLowerCase());
    });

    $: guestsByGroup = filteredGuestIds.reduce((acc, guestId) => {
        const groupId = allGuests[guestId].groupId;
        if (!acc[groupId]) {
            acc[groupId] = [];
        }
        acc[groupId].push(guestId);
        return acc;
    }, {});
</script>

<div>
    <input class="filter" type="text" bind:value={filter} placeholder="Search by name..." />
    <h2>{name} ({guestIds.length})</h2>
    <Separator />
    {#each Object.keys(guestsByGroup) as groupId}
        {#each guestsByGroup[groupId] as guestId}
            <p>{allGuests[guestId].name}</p>
        {/each}
        <Separator />
    {/each}
</div>

