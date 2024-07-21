<script>
    import H1 from "$lib/h1.svelte"; 
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from "$env/static/public"
    import { addMessage } from '$lib/stores/messages.js';
    import { onMount } from 'svelte';

    let users = []

    async function get_users () {
        let response = await fetch(PUBLIC_API_URL + "/user/users", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
        
        if (response.ok) {
            let data = await response.json()
            users = data
        } else {
            addMessage("error", "Nepodařilo se načíst data.")
            goto("/login")
        }
    }

    function deleteUser(id) {
        fetch(PUBLIC_API_URL + "/user/" + id, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        }).then(response => {
            if (response.ok) {
                users = users.filter(user => user.id !== id)
                console.log(response)
                addMessage("success", "Uživatel byl smazán.")
            } else {
                addMessage("error", "Nepodařilo se smazat uživatele.")
            }
        })
    }
    onMount(() => {
        get_users()
    })

</script>

<H1 text="Účet"/>
{#each users as user}
    <p>{user.email}</p>
    <button on:click={() => {deleteUser(user.id)}}>Smazat</button>
{/each}

<button on:click={() => {addMessage("success", "Test")}}>Přidat message</button>