<script>
    import { guestStore } from '$lib/stores/firestore';
    import { onMount } from 'svelte';
    import '../../style/rsvp/rsvp.less';
    
    let searchTerm = '';
    let loading = false;
    let results = [];
    let selectedGuest = null;
    let guestsToRsvp = [];
    let rsvpGuestData = [];
    let rsvpBegan = false;
    let currentRsvpGuestIndex = -1
    let submitted = false;

    onMount(() => {
        // Subscribe to the store
        guestStore.subscribe(value => {
            results = value;
            loading = false;
        });
    })

    // Handle search
    async function handleSearch() {
        if (!searchTerm) {
            results = [];
            return;
        }
        loading = true;
        await guestStore.searchGuests(searchTerm);
        loading = false;
    }

    // Debounce the search
    let searchTimeout;
    function handleInput() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(handleSearch, 300);
    }

    function toggleSelectedGuest(event, guest) {
        event.stopPropagation();
        if (selectedGuest === guest) {
            selectedGuest = null;
            guestsToRsvp = [];
        } else {
            selectedGuest = guest;
            guestsToRsvp = [guest.mainGuest, ...guest.groupMembers];
        }
    }

    function toggleGuestToRSVP(guest) {
        if (guestsToRsvp.includes(guest)) {
            guestsToRsvp = guestsToRsvp.filter(g => g.id !== guest.id);
        } else {
            guestsToRsvp = [...guestsToRsvp, guest];
        }
    }

    function beginRSVP() {
        rsvpBegan = true;
        rsvpGuestData = guestsToRsvp.map(guest => ({
            guest: guest,
            id: guest.id,
            dietaryRestrictions: null,
            comments: null,
            western: false,
            indian: false,
            invitedToWestern: guest.attendance.western.invited,
            invitedToIndian: guest.attendance.indian.invited
        }));

        console.log(rsvpGuestData);        
        currentRsvpGuestIndex = 0;
    }

    function nextGuest() {
        currentRsvpGuestIndex++;
    }

    function previousGuest() {
        currentRsvpGuestIndex--;
    }

    $: currentRsvpGuestEntry = currentRsvpGuestIndex >= 0 ? rsvpGuestData[currentRsvpGuestIndex] : null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        guestStore.updateRSVP(rsvpGuestData);
        submitted = true;
    }
</script>

<div class="content-box">
    <header class="header">
        <h1>RSVP</h1>
        <p>Just a lovely reminder to please RSVP by December 21st!</p>
    </header>
    {#if !submitted}
        {#if !rsvpBegan}
            <div class="search-container">
                <input
                    type="text" 
                    bind:value={searchTerm}
                    placeholder="Enter your first + last name..."
                    class="search-input"
                    on:input={handleInput}
                />
                
                {#if loading}
                    <div class="loading">Searching...</div>
                {:else}
                    <div class="results">
                        {#each results as result}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div 
                                class={`guest-group ${selectedGuest === result ? 'selected-guest' : ''}`} 
                                on:click={(event) => toggleSelectedGuest(event, result)}
                                role="button"
                                tabindex="0"
                            >
                                <!-- Main searched guest -->
                                <div class="main-guest">
                                    <h3>
                                        {#if result === selectedGuest}
                                            <input type="checkbox" 
                                                on:click|stopPropagation={() => toggleGuestToRSVP(result.mainGuest)}
                                                checked={guestsToRsvp.includes(result.mainGuest)}
                                            />
                                        {/if}
                                        {result.mainGuest.firstName} {result.mainGuest.lastName}
                                    </h3>
                                    {#if !result.mainGuest.rsvpSubmitted}
                                        <span class="pending">RSVP Pending</span>
                                    {/if}
                                    {#if result === selectedGuest && guestsToRsvp.length > 0}
                                        <button 
                                            class="proceed-button"
                                            on:click|stopPropagation={beginRSVP}
                                        >Proceed to RSVP</button>
                                    {/if}
                                </div>

                                <!-- Group members who haven't RSVP'd -->
                                {#if result.groupMembers.length > 0}
                                    <div class="group-members">
                                        <h4>Others in group pending RSVP:</h4>
                                        {#each result.groupMembers as member}
                                            <div class="member">
                                                {#if result === selectedGuest}
                                                    <input type="checkbox" 
                                                        on:click|stopPropagation={() => toggleGuestToRSVP(member)}
                                                        checked={guestsToRsvp.includes(member)}
                                                    />
                                                {/if}
                                                {member.firstName} {member.lastName}
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="rsvp-container">
                {#if currentRsvpGuestEntry !== null}
                    <form on:submit={handleSubmit}>
                        <h3>{currentRsvpGuestEntry.guest.firstName} {currentRsvpGuestEntry.guest.lastName}</h3>
                        {#if currentRsvpGuestEntry.invitedToWestern}
                            <label for="rsvp-attending-western">Will you be attending the Western ceremony?</label>
                            <span>
                                <input id="rsvp-attending-western-yes" type="radio" bind:group={currentRsvpGuestEntry.western} value={true} />
                                <label for="rsvp-attending-western-yes">Yes</label>
                            </span>
                            <span>
                                <input id="rsvp-attending-western-no" type="radio" bind:group={currentRsvpGuestEntry.western} value={false} />
                                <label for="rsvp-attending-western-no">No</label>
                            </span>
                        {/if}
                        {#if currentRsvpGuestEntry.invitedToIndian}
                            <label for="rsvp-attending-indian">Will you be attending the Indian ceremony?</label>
                            <span>
                                <input id="rsvp-attending-indian-yes" type="radio" bind:group={currentRsvpGuestEntry.indian} value={true} />
                                <label for="rsvp-attending-indian-yes">Yes</label>
                            </span>
                            <span>
                                <input id="rsvp-attending-indian-no" type="radio" bind:group={currentRsvpGuestEntry.indian} value={false} />
                                <label for="rsvp-attending-indian-no">No</label>
                            </span>
                        {/if}
                        <label for="rsvp-dietary-restrictions">Allergies + Dietary Restrictions:</label>
                        <textarea id="rsvp-dietary-restrictions" bind:value={currentRsvpGuestEntry.dietaryRestrictions}></textarea>
                        <label for="rsvp-comments">Comments:</label>
                        <textarea id="rsvp-comments" bind:value={currentRsvpGuestEntry.comments}></textarea>
                        <div class="button-container">
                            {#if currentRsvpGuestIndex > 0}
                            <button type="button" on:click={previousGuest} id='previous'>Previous</button>
                            {/if}
                            {#if guestsToRsvp.length > currentRsvpGuestIndex + 1}
                                <button type="button" on:click={nextGuest} id='next'>Next</button>
                            {:else}
                                <button type="submit" id='submit'>Submit</button>
                            {/if}
                        </div>
                    </form>
                {/if}
            </div>
        {/if}
    {:else}
        <h2 id='rsvp-submitted-msg'>RSVP Submitted!</h2>
    {/if}
</div>