<script>
    import { fashionOptions, CultureDay, ColorsToAvoid } from '$lib/data/fashionOptions';
    import { fade } from 'svelte/transition';
    import '../../style/fashion/fashion.less';

    let currentView = 'culture'; // culture -> gender -> options
    let selectedCulture = "";
    let selectedGender = "";
    let showPopup = false;
    let selectedOption = {
        description: '',
        image: ''
    };

    function selectCulture(culture) {
        selectedCulture = culture;
        currentView = 'gender';
    }

    function selectGender(gender) {
        selectedGender = gender;
        currentView = 'options';
    }

    function showOptionDetails(option) {
        selectedOption = option;
        showPopup = true;
    }

    function goBack() {
        if (currentView === 'gender') {
            currentView = 'culture';
            selectedCulture = "";
        } else if (currentView === 'options') {
            currentView = 'gender';
            selectedGender = "";
        }
        showPopup = false;
    }
</script>


<div class="content-box fashion-container">
    <p>
        Given that our wedding is multiple days + multicultural, we are inviting our guests to share in the expression of the cultures through what they wear:
    </p>

    {#if currentView !== 'culture'}
        <button class="back-button" on:click={goBack}>← Back</button>
    {/if}

    {#if currentView === 'culture'}
        <div class="options-grid">
            {#each Object.keys(fashionOptions) as culture}
                <div class="card-container">
                    <div 
                        class="card"
                        on:click={() => selectCulture(culture)}
                        on:keydown={(e) => e.key === 'Enter' && selectCulture(culture)}
                        tabindex="0"
                        role="button"
                    >
                        <h2>{CultureDay[culture]} - {culture}</h2>
                        <p>Click to explore {culture} fashion options</p>
                    </div>
                    <p class="please-avoid">Please avoid the following colors on {CultureDay[culture]}: </p>
                    <div class="color-tile-container">
                        <div class="tiles">
                            {#each ColorsToAvoid[culture] as color}
                                <div class="color-tile" style="background-color: {color.cssColor}">{color.color}</div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if currentView === 'gender'}
        <div class="options-grid">
            {#each ['Men', 'Women'] as gender}
                <div 
                    class="card"
                    on:click={() => selectGender(gender)}
                    on:keydown={(e) => e.key === 'Enter' && selectGender(gender)}
                    tabindex="0"
                    role="button"
                >
                    <h2>{gender}</h2>
                    <p>View {gender} {selectedCulture} fashion options</p>
                </div>
            {/each}
        </div>
    {:else if currentView === 'options'}
        <div class="options-grid">
            {#each fashionOptions[selectedCulture ?? ''][selectedGender ?? ''].options as option}
                <div 
                    class="option-card-container" 
                    on:click={() => showOptionDetails(option)}
                    on:keydown={(e) => e.key === 'Enter' && showOptionDetails(option)}
                    role="button"
                    tabindex="0"
                >
                    <div 
                        class="option-card"                        
                    >
                        <h2>{@html option.description}</h2>
                        <p>Click for more details</p>
                    </div>
                    {#if option.image}
                        <img src={option.image} alt={option.description} />
                    {/if}
                </div>
            {/each}
        </div>
    {/if}

    {#if showPopup && selectedOption}
        <div class="popup-overlay" transition:fade={{ duration: 100 }}>
            <div class="popup-content">
                <button class="close-button" on:click={() => showPopup = false}>×</button>
                <h2>{@html selectedOption.description}</h2>
                <h3>Where to buy:</h3>
                <div class="links-container">
                    {#each fashionOptions[selectedCulture ?? ''][selectedGender ?? ''].checkOutToBuy as store}
                        <a href={store.link} target="_blank" rel="noopener noreferrer">
                            {store.name}
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>