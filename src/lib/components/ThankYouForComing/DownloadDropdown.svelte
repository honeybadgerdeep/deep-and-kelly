<script>
    import '../../../style/DownloadDropdown/download-dropdown.less';
    import { grabImagesAsZip } from '$lib/data/thankYou';
    import InlineLoader from '../InlineLoader/InlineLoader.svelte';
    export let groupId;
    export let groupKey;

    let loading = false;
</script>

{#if loading}
    <InlineLoader />
{/if}

<div class="download-dropdown">
    <button class="dropdown-button" on:click={() => {
        loading = true;
        grabImagesAsZip(groupId, groupKey).then().then(data => {
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ourweddingphotos.zip';
            loading = false;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    }}>
        <span>Download</span>
    </button>
</div>