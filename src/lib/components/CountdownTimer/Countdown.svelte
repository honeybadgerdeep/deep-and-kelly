<script>
    import { onMount, onDestroy } from 'svelte';
    import { weddingInfo } from '$lib/data/weddingInfo.js';
    import TimerEntry from './TimerEntry.svelte';
    import TimerSpacer from './TimerSpacer.svelte';
    import '../../../style/CountdownTimer/countdown-timer.less';

    let difference;
    let days = 0, hours = 0, minutes = 0, seconds = 0;
    let timer = 0;

    function updateCountdown() {
        const now = Date.now();
        const firstEvent = weddingInfo.events.sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())[0];
        difference = (new Date(firstEvent.date)).getTime() - now;

        // Convert to days, hours, minutes, seconds
        days = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((difference % (1000 * 60)) / 1000);
    }

    onMount(() => {
        updateCountdown(); // Initial call
        timer = setInterval(updateCountdown, 1000);
    });

    onDestroy(() => {
        clearInterval(timer);
    });
</script>

<div id='countdown-timer'>
    <TimerEntry quantity={days} timeUnit={'Days'} />
    <TimerSpacer />
    <TimerEntry quantity={hours} timeUnit={'Hours'} />
    <TimerSpacer />
    <TimerEntry quantity={minutes} timeUnit={'Minutes'} />
    <TimerSpacer />
    <TimerEntry quantity={seconds} timeUnit={'Seconds'} />
</div>