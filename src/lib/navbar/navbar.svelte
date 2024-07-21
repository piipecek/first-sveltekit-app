<script>
    import NavbarItem from "$lib/navbar/navbar-item.svelte"
    import { onMount } from "svelte"
    import { PUBLIC_API_URL } from "$env/static/public"



    let roles = [];

    async function get_roles() { // tohle je jen convinience funkce, která upravuje vzhled navbaru. Opravdová autentizace se děje v backendu při requestu endpoint-specific informací.
        let access_token = localStorage.getItem("access_token")
        if (!access_token) {
            roles = []
            return
        } else {
            let response = await fetch(PUBLIC_API_URL + "/auth/roles", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + access_token
                }
            })
            
            if (response.ok) {
                let data = await response.json()
                roles = data.roles
            } else {
                localStorage.removeItem("access_token")
                roles = []
            }
            
        }
    }

    onMount(() => {
        get_roles()
    })
</script>

<div class="navbar">
    <NavbarItem text="Domů" href="/"/>
    {#if roles.length === 0}
        <NavbarItem text="Login" href="/login"/>
        <NavbarItem text="Register" href="/register"/>
    {:else}
        <NavbarItem text="Účet" href="/account"/>
        <NavbarItem is_logout={true}/>
    {/if}
</div>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 60px;
        background-color: #333;
        color: #fff;
    }
</style>