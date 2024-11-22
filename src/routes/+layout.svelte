<script>
    import Topbar from '$lib/components/Topbar.svelte';
    import '../style/global.less';
</script>

<Topbar/>
<div id='content'>
    <slot/>
</div>