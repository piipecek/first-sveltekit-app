<script>
    import { onDestroy } from 'svelte';
    import { messages, removeMessage } from '$lib/stores/messages.js';
    import { fade } from 'svelte/transition';

    let flashMessages = [];

    const unsubscribe = messages.subscribe(value => {
        flashMessages = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleRemoveMessage(message) {
        removeMessage(message);
    }
</script>

<div class="toasts">
    {#each flashMessages as message}
    
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <article class={message.type} role="alert" transition:fade on:click={() => handleRemoveMessage(message)}>
            {message.text}
        </article>
    {/each}
</div>

<style lang="postcss">
    article {
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    margin: 0 auto 0.5rem auto;
    width: 20rem;
  }
  .error {
    background: IndianRed;
  }
  .success {
    background: MediumSeaGreen;
  }
    .message {
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 5px;
        color: white;
    }
    .message.success {
        background-color: green;
    }
    .message.error {
        background-color: red;
    }
    .toasts {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        width: 100%;
        display: flex;
        margin-top: 1rem;
        justify-content: center;
        flex-direction: column;
        z-index: 1000;
  }
</style>