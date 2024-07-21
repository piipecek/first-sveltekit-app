<script>
    export let text = null;
    export let href = null;
    export let is_logout = false;
    
    function logout() {
        localStorage.removeItem("access_token")
        alert("You have been logged out.")
    }

</script>


<div class="nav-item">
    {#if is_logout}
        <a href="/" on:click={logout}>Logout</a>
    {:else}
        <a href="{href}">{text}</a>
    {/if}
</div>

<style>
    .nav-item {
        display: inline-block;
        margin-right: 10px;
    }
    .nav-item a {
        color: #fff;
        text-decoration: none;
    }
</style>