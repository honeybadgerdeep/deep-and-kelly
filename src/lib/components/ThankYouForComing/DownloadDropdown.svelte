<script>
    import '../../../style/DownloadDropdown/download-dropdown.less';

    let expanded = false;

    function toggleExpand() {
        expanded = !expanded;
    }

    function closeDropdown() {
        expanded = false;
    }

    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-button')) {
            closeDropdown();
        }
    });

    const downloadOriginalSize = () => {
        // Logic here
        closeDropdown();
    }

    const downloadCompressedSize = () => {
        // Locally push all the images, which are the compressed versions, to a zip and
        // then download the zip
        const zip = new JSZip();

        const images = document.querySelectorAll('');

        closeDropdown();
    }
</script>

<div class="download-dropdown">
    <button class="dropdown-button" on:click={toggleExpand}>
        <span>Download</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 6L0 0L10 0L5 6Z" fill="white"/>
        </svg>
    </button>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#if expanded}
        <div class="dropdown-content" on:click|stopPropagation={(e) => e.stopPropagation()}>
            <button on:click|preventDefault={() => downloadOriginalSize()}>Original</button>
            <button on:click|preventDefault={() => downloadCompressedSize()}>Compressed</button>
        </div>
    {/if}
</div>