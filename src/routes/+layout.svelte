<script>
    import Topbar from '$lib/components/Topbar.svelte';
    import '../style/global.less';
    import { page } from '$app/stores';
</script>

<!-- 
    The Thank You page is a full screen page, so we don't want the topbar on it
-->
{#if $page.route.id !== '/thank-you'}
    <Topbar/>
{/if}
<div id='content'>
    <slot/>
</div>