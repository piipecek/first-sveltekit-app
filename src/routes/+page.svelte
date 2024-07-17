<script>
    import Title from '$lib/title.svelte';
</script>


<div class="hlavni">
    <Title />
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>


<style>
    .hlavni {
        margin: 2rem;
        font: 1rem sans-serif;
    }
    h1 {
        color: #999;
    }
    p {
        color: blue;
    }
    a {
        color: red;
    }
</style>