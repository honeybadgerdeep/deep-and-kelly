<script>
    import '../../style/wedding-party/wedding-party.less';
    import { PartyType, weddingParty } from '$lib/data/weddingParty';

    let groosmen = weddingParty.filter(guest => guest.group === PartyType.Groomsmen);
    let bridesmaids = weddingParty.filter(guest => guest.group === PartyType.Bridesmaids);

    let selectedGuest = null;
</script>

<div id='wedding-party-parent'>
    <div class='wedding-party-group'>
        <h3>Groomsmen</h3>
        <div class='wedding-party-row'>
            {#each groosmen as groom}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class='wedding-party-member' on:click={() => selectedGuest = groom}>
                    <img 
                        src={`https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto/v1732162078/Wedding Party/${groom.pictureName}.jpg`} 
                        alt="{groom.name}"
                    />
                    <p>{groom.name}</p>
                </div>
            {/each}
        </div>
    </div>

    <div class='wedding-party-group'>
        <h3>Bridesmaids</h3>
        <div class="wedding-party-row">
            {#each bridesmaids as bridesmaid}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class='wedding-party-member' on:click={() => selectedGuest = bridesmaid}>
                    <img 
                        src={`https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto/v1732162078/Wedding Party/${bridesmaid.pictureName}.jpg`} 
                        alt="{bridesmaid.name}"
                    />
                    <p>{bridesmaid.name}</p>
                </div>
            {/each}
        </div>
    </div>

    {#if selectedGuest}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="guest-details" on:click={() => selectedGuest = null}>
            <h3>Name</h3>
            <p>{selectedGuest.name}</p>
            <img 
                src={`https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto/v1732162078/Wedding Party/${selectedGuest.pictureName}.jpg`} 
                alt="{selectedGuest.name}"
            />           
            <h3>Relationship</h3> 
            <p>{@html selectedGuest.relationship}</p>
            <h3>Role in Wedding</h3>
            <p>{@html selectedGuest.roleInWedding}</p>
            <h3>How Long Known</h3>
            <p>{@html selectedGuest.howLongKnown}</p>
            <h3>How We Met / A Fun Anecdote</h3>
            <p>{@html selectedGuest.howMetOrAnecdote}</p>
            <h3>Height</h3>
            <p>{@html selectedGuest.height}</p>
            <h3>Favorite Pasta Shape</h3>
            <p>{@html selectedGuest.favoritePastaShape}</p>
            <h3>Useless Talent</h3>
            <p>{@html selectedGuest.uselessTalent}</p>
            <h3>Childhood Celebrity Crush</h3>
            <p>{@html selectedGuest.childhoodCelebrityCrush}</p>
            <h3>Go To Karaoke Song</h3>
            <p>{@html selectedGuest.goToKaraokeSong}</p>
        </div>
    {/if}
</div>