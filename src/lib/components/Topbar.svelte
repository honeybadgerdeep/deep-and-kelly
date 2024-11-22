<script>
    import { navLinks } from "$lib/data/navLinks";
    import { page } from '$app/stores';

    $: isActive = (path) => $page.route.id === path;

    let showMobileMenu = false;

    function toggleMobileMenu() {
        showMobileMenu = !showMobileMenu;
    }
</script>
<div id="top-header">
    <a href='/'>Deep + Kelly</a>
    <div class="underline"></div>
    <nav>
        {#each navLinks as {href, label, readyForPublic}}
            {#if readyForPublic}
                <a 
                    class={`nav-link ${isActive(href) ? 'active' : ''}`} 
                    href={href}
                >
                    {label}
                </a>
            {/if}
        {/each}
    </nav>
</div>
<div id="top-bar-mobile">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        class={`hamburger ${showMobileMenu ? 'open' : 'closed'}`} 
        on:click={toggleMobileMenu}
        role="button"
        tabindex="0"
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
    {#if showMobileMenu}
        <div class="mobile-menu">
            {#each navLinks as {href, label, readyForPublic}}
                {#if readyForPublic}
                    <a 
                        class={`nav-link ${isActive(href) ? 'active' : ''}`} 
                        href={href}
                        on:click={toggleMobileMenu}
                    >
                        {label}
                    </a>
                {/if}
            {/each}
        </div>
    {/if}
</div>