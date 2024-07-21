<script>
    import H1 from "$lib/h1.svelte"; 
    import Navbar from "$lib/navbar/navbar.svelte";
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from "$env/static/public"
    

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
            alert("You are not authorized to view this page.")
            goto("/login")
        }
    }
</script>

<Navbar/>
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