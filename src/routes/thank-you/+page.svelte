<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import '../../style/thank-you/thank-you.less';
    import MasonryGallery from '../../lib/components/ThankYouForComing/MasonryGallery.svelte';
    import DownloadDropdown from '../../lib/components/ThankYouForComing/DownloadDropdown.svelte';
    import {
        validateGroupId,
        grabImages,
    } from '$lib/data/thankYou';
    import InlineLoader from '../../lib/components/InlineLoader/InlineLoader.svelte';

    // Constants
    const WRONG_LINK_ERROR = 'The link that you have used is invalid. Please use the link that was specifically sent to you by your host. If you are unable to find the link, please contact your host.'
    const INVALID_GROUP_KEY = 'The group key is invalid. Try again!';
    const STORAGE_KEY = 'groupKeyInfo';

    // Reactive variables
    $: errorMessage = '';
    $: loading = true;
    $: groupId = $page.url.searchParams.get('groupId');
    $: groupIdIsValid = false;
    let groupKey = '';
    $: validated = groupIdIsValid && isGroupKeyValid;
    $: submitAttempted = false;
    $: readyToLoadPictures = false;
    $: cdnImages = [];
    $: groupMessage = "Your presence at our wedding made our special day even more magical. We are so grateful for the love, laughter, and beautiful memories you helped create.";
    $: isGroupKeyValid = false;
    $: inputClass = submitAttempted && !isGroupKeyValid ? 'invalid-input' : '';
    $: groupExistsInStorage = groupId ? !!getCachedGroupKey(groupId) : false;

    // LocalStorage helper functions
    function getStoredGroupKeyInfo() {
        try {
            const stored = window?.localStorage?.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error parsing stored group key info:', error);
            return null;
        }
    }

    function updateStoredGroupKeyInfo(groupId, groupKey) {
        const groupKeyInfo = getStoredGroupKeyInfo() || {
            groupKeys: {},
            lastGroupId: null,
            lastRegisteredTime: null
        };

        groupKeyInfo.groupKeys[groupId] = groupKey;
        groupKeyInfo.lastGroupId = groupId;
        groupKeyInfo.lastRegisteredTime = Date.now();

        try {
            window?.localStorage?.setItem(STORAGE_KEY, JSON.stringify(groupKeyInfo));
        } catch (error) {
            console.error('Error storing group key info:', error);
        }
    }

    function getCachedGroupKey(groupId) {
        const groupKeyInfo = getStoredGroupKeyInfo();
        return groupKeyInfo?.groupKeys?.[groupId] || null;
    }

    // Image loading function
    async function loadImagesForGroup(groupId, groupKey) {
        try {
            const response = await grabImages(groupId, groupKey);
            cdnImages = response.pictures.map(cdn_url =>
                decodeURIComponent(cdn_url.replace(/\\u0026/g, '%26'))
            );
            
            if (response.message.length > 0) {
                groupMessage = response.message;
            }
            
            isGroupKeyValid = true;
            errorMessage = '';
            
            // Update cache after successful load
            updateStoredGroupKeyInfo(groupId, groupKey);
            
            return true;
        } catch (error) {
            console.error('Error loading images:', error);
            isGroupKeyValid = false;
            return false;
        }
    }

    onMount(() => {
        loading = true;
        
        if (groupId) {
            validateGroupId(groupId)
                .then(() => {
                    groupIdIsValid = true;
                    
                    // Check for cached group key
                    const cachedKey = getCachedGroupKey(groupId);
                    if (cachedKey) {
                        groupKey = cachedKey;
                        // Try to load images with cached key
                        loadImagesForGroup(groupId, cachedKey);
                    }
                })
                .catch(() => {
                    groupIdIsValid = false;
                    errorMessage = WRONG_LINK_ERROR;
                });
        } else {
            groupIdIsValid = false;
            errorMessage = WRONG_LINK_ERROR;
        }

        // Scroll listener for lazy loading pictures
        const handleScroll = () => {
            const picturesElement = document.querySelector('#thank-you-group-pictures');
            if (picturesElement && window.scrollY >= picturesElement.offsetTop) {
                readyToLoadPictures = true;
                // Remove listener after first trigger
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        loading = false;

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    async function handleSubmit(event) {
        event.preventDefault();
        submitAttempted = true;

        const success = await loadImagesForGroup(groupId, groupKey);
        
        const groupKeyInput = document.querySelector('#group-key');
        if (!success) {
            errorMessage = INVALID_GROUP_KEY;
            groupKeyInput?.setCustomValidity(INVALID_GROUP_KEY);
            groupKeyInput?.classList.add('invalid-input');
        } else {
            errorMessage = '';
            groupKeyInput?.setCustomValidity('');
            groupKeyInput?.classList.remove('invalid-input');
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
        document.querySelector('#thank-you-group-pictures')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
</script>

{#if loading}
    <InlineLoader />
{/if}

{#if !loading}
    {#if errorMessage?.length > 0}
        <p class="error-message">{errorMessage}</p>
    {/if}

    {#if groupIdIsValid && !isGroupKeyValid && !groupExistsInStorage}
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
                        <p>{groupMessage}</p>
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
                    <DownloadDropdown 
                        groupId={groupId}
                        groupKey={groupKey}
                    />
                </div>
                {#if readyToLoadPictures}
                    <MasonryGallery photoSource={cdnImages} />
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