<script>
    import '../../../style/RSVPSummary/rsvp-summary.less';
    import { verifyUserPassphrase } from '$lib/data/typeform';

    import { onMount } from 'svelte';
    import RsvpSummary from './RSVPSummary.svelte';

    onMount(() => {
        const timestamp = localStorage.getItem('rsvp-authenticated-timestamp');
        if (timestamp) {
            const now = Date.now();
            const difference = now - timestamp;

            if (difference < 60000) {
                verified = true;
            }
        }

        loading = false;
    })

    let loading = true;
    let passphrase = '';

    let verified = false;
    let attempted = false;
    const verify = async (passphrase) => {
        if (passphrase === '') {
            return;
        }
        
        verified = await verifyUserPassphrase(passphrase)
        if (verified) {
            // Write to local storage:
            localStorage.setItem('rsvp-authenticated-timestamp', Date.now());
        }
        attempted = true;
    }

    const handleKeyPress = (e) => {
        attempted = false;

        if (e.key === 'Enter') {
            verify(passphrase);
        }
    }
</script>

<div id="rsvp-authenticator">
    {#if loading}
        <p>Loading...</p>
    {:else}
        <h1>
            {#if verified}
                RSVP Summary
            {:else if !loading}
                RSVP Authenticator
            {/if}
        </h1>
        {#if !verified}
            <p>Please enter the RSVP Review Passphrase:</p>
            <form on:submit={(e) => e.preventDefault()}>
                {#if attempted}
                    <p class="incorrect">Incorrect Passphrase</p>
                {/if}
                <input 
                    type="password" 
                    bind:value={passphrase} 
                    on:keypress={handleKeyPress} 
                />
                <button 
                    type="submit" 
                    on:click={() => verify(passphrase)}
                >
                    Submit
                </button>
            </form>
        {/if}
        {#if verified}
            <RsvpSummary />
        {/if}
    {/if}
</div>