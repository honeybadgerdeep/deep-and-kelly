<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import '../../style/gallery/gallery.less';

    let selectedPhoto = {
        name: '',
        src: '',
        alt: '',
    };
    let showLightbox = false;
    let NUMBER_OF_PHOTOS = 55;

    let randomizedSequenceOfPhotos = [];

    onMount(() => {
        randomizedSequenceOfPhotos = Array.from({ length: NUMBER_OF_PHOTOS }).map((_, index) => index + 1);
        for (let i = randomizedSequenceOfPhotos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedSequenceOfPhotos[i], randomizedSequenceOfPhotos[j]] = [randomizedSequenceOfPhotos[j], randomizedSequenceOfPhotos[i]];
        }
    });

    function openLightbox(index) {
        selectedPhoto = {
            name: `Photo ${index + 1}`,
            src: `https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto/v1732162078/${index + 1}.jpg`,
            alt: `Photo ${index + 1}`,
        };
        showLightbox = true;
    }

    function closeLightbox() {
        showLightbox = false;
    }
</script>

<svelte:head>
    <title>Our Engagement Photos</title>
</svelte:head>

<div id="gallery-box">
    <header class="header">
        <h1>Deep & Kelly's Special Moments</h1>
    </header>

    <div class="masonry-grid">
        {#each randomizedSequenceOfPhotos as photoId}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div 
                class="masonry-item" 
                role='button' 
                tabindex="0" 
                on:click={() => openLightbox(photoId - 1)}
            >
                <img
                    class="skeleton"
                    loading="lazy"
                    src={`https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto,w_400,q_10/v1732162078/${photoId}.jpg`}
                    data-src={`https://res.cloudinary.com/dqn01uu9g/image/upload/f_auto,q_auto,w_400/v1732162078/${photoId}.jpg`}
                    alt={`Photo ${photoId}`}
                    on:load={(event) => {
                        event.target.classList.remove('skeleton');
                        event.target.src = event.target.dataset.src;
                    }}
                    transition:fade
                />
            </div>
        {/each}
    </div>

    {#if showLightbox}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="lightbox" on:click={closeLightbox}>
            <div class="lightbox-content">
                <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
                <p>{selectedPhoto.name}</p>
            </div>
        </div>
    {/if}
</div>