<script>
    import NavbarItem from "$lib/navbar/navbar-item.svelte"
    import { onMount } from "svelte"
    import { PUBLIC_API_URL } from "$env/static/public"
    import { roles, setRoles, purgeRoles } from "$lib/stores/roles.js"

    let _roles = []
    let roles_loaded = false

    async function get_roles() { // tohle je jen convinience funkce, která upravuje vzhled navbaru. Opravdová autentizace se děje v backendu při requestu endpoint-specific informací.
        let access_token = localStorage.getItem("access_token")
        if (!access_token) {
            purgeRoles()
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
                setRoles(data.roles)
            } else {
                localStorage.removeItem("access_token")
                purgeRoles()
            }
            
        }
    }

    onMount(() => {
        get_roles().then(() => {
            roles.subscribe(value => {
                _roles = value
            })
            roles_loaded = true
        })
    })

</script>

<div class="navbar">
    {#if roles_loaded}
        <NavbarItem text="Domů" href="/"/>
        {#if _roles.length === 0}
            <NavbarItem text="Login" href="/login"/>
            <NavbarItem text="Register" href="/register"/>
        {:else}
            <NavbarItem text="Účet" href="/account"/>
            <NavbarItem is_logout={true}/>
        {/if}
    {:else}
        <NavbarItem text="Loading..."/>
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