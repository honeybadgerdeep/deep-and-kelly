<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import '../../style/thank-you/thank-you.less';
    import MasonryGallery from '../../lib/components/ThankYouForComing/MasonryGallery.svelte';
    import DownloadDropdown from '../../lib/components/ThankYouForComing/DownloadDropdown.svelte';
    import { grabImages } from '$lib/data/thankYou';

    // Reactive variables
    $: loading = true;
    $: groupId = $page.url.searchParams.get('groupId');
    let groupKey = '';
    $: validated = false;
    $: submitAttempted = false;
    $: readyToLoadPictures = false;
    $: groupImages = [];

    // Validation logic
    $: isGroupKeyValid = groupKey && groupKey.length === 7;
    $: inputClass = submitAttempted && !isGroupKeyValid ? 'invalid-input' : '';

    onMount(() => {
        if (window.localStorage.getItem('groupKeyInfo')) {
            if ($page.url.searchParams.get('groupId')) {
                groupId = $page.url.searchParams.get('groupId');
            }
            const groupKeyInfo = JSON.parse(window.localStorage.getItem('groupKeyInfo'));
            if (groupId && groupKeyInfo.groupKeys[groupId]) {
                const now = Date.now();
                groupKeyInfo.lastRegisteredTime = now;
                groupKeyInfo.lastGroupId = groupId;
                window.localStorage.setItem('groupKeyInfo', JSON.stringify(groupKeyInfo));
                validated = true;
                groupKey = groupKeyInfo.groupKeys[groupId];
            }
        }

        window.addEventListener('scroll', () => {
            // If the user has scrolled to #thank-you-group-pictures, 
            // set readyToLoadPictures to true
            if (window.scrollY >= document.querySelector('#thank-you-group-pictures').offsetTop) {
                readyToLoadPictures = true;
            }
        })

        loading = false;
    })

    async function handleSubmit(event) {
        event.preventDefault();
        grabImages(groupId, groupKey);
        submitAttempted = true;
        if (!isGroupKeyValid) {
            document.querySelector('#group-key').setCustomValidity('The group key is invalid. Try again!');
            document.querySelector('#group-key').classList.add('invalid-input');
        } else {
            document.querySelector('#group-key').setCustomValidity('');
            document.querySelector('#group-key').classList.remove('invalid-input');
        }
        validated = isGroupKeyValid;
        if (validated) {
            // Add to local storage somehow:
            if (!window.localStorage.getItem('groupKeyInfo')) {
                window.localStorage.setItem('groupKeyInfo', JSON.stringify({
                    groupKeys: {
                        [groupId]: groupKey,
                    },
                    lastGroupId: groupId,
                    lastRegisteredTime: Date.now(),
                }));
            } else {
                const groupKeyInfo = JSON.parse(window.localStorage.getItem('groupKeyInfo'));
                groupKeyInfo.groupKeys[groupId] = groupKey;
                groupKeyInfo.lastGroupId = groupId;
                groupKeyInfo.lastRegisteredTime = Date.now();
                window.localStorage.setItem('groupKeyInfo', JSON.stringify(groupKeyInfo));
            }
        }
    }

    function handleGroupKeyInvalid(event) {
        if (event.target.validity.valueMissing) {
            event.target.setCustomValidity('Group key is required to access your Thank You card.');
        }
    }

    function handleGroupKeyInput(event) {
        event.target.setCustomValidity('');
        // Reset submit attempt when user starts typing again
        if (submitAttempted && !validated) {
            submitAttempted = false;
        }
    }

    function scrollToPictures() {
        document.querySelector('#thank-you-group-pictures').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    const loadImages = async () => {
        // groupImages = await grabImages(groupId);
    }

    $: if (readyToLoadPictures && groupId) loadImages();
</script>
{#if loading}
    <p>Loading...</p>
{/if}

{#if !loading}
    {#if !groupId}
        <p>Please use the link that was specifically sent to you by your host. If you are unable to find the link, please contact your host.</p>
    {/if}
    {#if groupId && !validated}
        <form id="page-validation-form" on:submit={handleSubmit}>
            <div>
                <input 
                    type="password"
                    placeholder="Enter Group Key"
                    id="group-key"
                    bind:value={groupKey}
                    class={inputClass}
                    on:invalid={handleGroupKeyInvalid}
                    on:input={handleGroupKeyInput}
                    required
                />
                <button type="submit">Submit</button>
            </div>
        </form>
    {/if}

    {#if validated}
        <div id='thank-you-card'>
            <div id='thank-you-message'>
                <div id="thank-you-message-box">
                    <div class="thanks-header">
                        <h2>Thank you for coming to our wedding!</h2>
                        <h3>With Hearts Full of Gratitude and Celebration</h3>
                        <div class='thanks-divider'></div>
                        <!-- TODO: Make this not hardcoded -->
                        <p id='greeting'>Dear Guest</p>
                        <p>
                            Your presence at our wedding made our special day even more magical.
                            We are so grateful for the love, laughter, and beautiful memories you helped create.
                        </p>
                        <p>
                            Please enjoy these photos from our celebration as a token of our appreciation.                            
                        </p>
                    </div>
                    <button 
                        id='view-pictures' 
                        type="button"
                        on:click={scrollToPictures}
                    >
                        View Pictures
                    </button>
                </div>
            </div>

            <div id="thank-you-group-pictures">
                <div id="group-pictures-header">
                    <h2>Your Pictures</h2>
                    <div class='thanks-divider'></div>
                    <DownloadDropdown />
                </div>
                {#if readyToLoadPictures}
                    <MasonryGallery photoSource={groupImages} />
                {/if}
            </div>

            <div id='thank-you-card-footer'>
                <p id='cannot-wait'>
                    We can't wait to share more memories with you!
                </p>
                <div class="thanks-divider"></div>
                <p id='love-signed'>
                    With Love & Gratitude
                    <br/>
                    Deep & Kelly
                </p>
            </div>
        </div>
    {/if}
{/if}
