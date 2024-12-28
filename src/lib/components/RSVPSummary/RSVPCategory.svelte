<script>
    export let name;
    export let allGuests;
    export let guestIds;
    import Separator from './Separator.svelte';

    let guestsByGroup = guestIds.reduce((acc, guestId) => {
        const groupId = allGuests[guestId].groupId;
        if (!acc[groupId]) {
            acc[groupId] = [];
        }
        acc[groupId].push(guestId);
        return acc;
    }, {});
</script>

<div>
    <h2>{name} ({guestIds.length})</h2>
    <Separator />
    {#each Object.keys(guestsByGroup) as groupId}
        {#each guestsByGroup[groupId] as guestId}
            <p>{allGuests[guestId].name}</p>
        {/each}
        <Separator />
    {/each}
</div>

