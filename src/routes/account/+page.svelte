<script>
    import H1 from "$lib/h1.svelte"; 
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from "$env/static/public"
    import { addMessage } from '$lib/stores/messages.js';

    

    let users = async () => {
        let response = await fetch(PUBLIC_API_URL + "/user/users", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
        
        if (response.ok) {
            let data = await response.json()
            return data
        } else {
            addMessage("error", "Nepodařilo se načíst data.")
            goto("/login")
        }
    }
</script>

<H1 text="Účet"/>
{#await users()}
    <p>Loading...</p>
{:then data}
    {#each data as user}
        <p>{user.email}</p>
    {/each}
{:catch error}
    <p>{error}</p>
{/await}

<button on:click={() => {addMessage("success", "Test")}}>Přidat message</button>