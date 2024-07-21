<script>
    export let text = null;
    export let href = null;
    export let is_logout = false;
    import { addMessage } from '$lib/stores/messages.js';
    import { purgeRoles} from '$lib/stores/roles.js';
    
    function logout() {
        localStorage.removeItem("access_token")
        purgeRoles()
        addMessage("success", "Odhlášení proběhlo úspěšně.")
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