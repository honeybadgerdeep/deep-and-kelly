<style>
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }

    .loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8px;
        width: 100px;
        background-color: white;
        animation: slide 1.5s linear infinite;
    }

    @keyframes slide {
        0% { width: 0%; }
        100% { width: 100%; }
    }
</style>

<div class="loader" bind:this={loader} on:transitionend={handleTransitionEnd}>
    <div class="loader-container"></div>
</div>

<script>
  export let loader;

  function handleTransitionEnd() {
    loader.classList.add('fade-out');
  }
</script>

