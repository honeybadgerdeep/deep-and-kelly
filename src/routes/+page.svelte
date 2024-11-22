<script>
    import '../style/home/page.less';
    import Countdown from '../lib/components/CountdownTimer/Countdown.svelte';
    import EventDisplay from '$lib/components/EventDisplay.svelte';
    import { weddingInfo } from '$lib/data/weddingInfo';
    import FianceHead from '$lib/components/FianceHead.svelte';
</script>

<svelte:head>
    <title>Deep + Kelly</title>
</svelte:head>

<div id='getting-married'>
    <p class='title'>We're Getting Married!</p>
    <Countdown />
</div>
<h1 style="text-align: center; margin-top: 50px; font-weight: 300;">Deep Sethi + Kelly Cottini</h1>
<div id="timeline-info">
    {#each weddingInfo.events as {date, location}, index}
        <EventDisplay 
            date={new Date(date).toLocaleDateString()} 
            location={location}
        />
        {#if index != weddingInfo.events.length - 1}
            <div class="vertical"></div>
        {/if}
    {/each}
</div>
<button id="day-of-details" >
    <a href="/rsvp">
        RSVP
    </a>
</button>