<script>
    import Navbar from '$lib/navbar/navbar.svelte';
    import H1 from "$lib/h1.svelte";
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from "$env/static/public"

    let email = ""
    let password = ""

    async function handle_login() {
        let response = await fetch(PUBLIC_API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (response.ok) {
            let data = await response.json()
            localStorage.setItem("access_token", data.access_token)
            alert("Přihlášení proběhlo úspěšně.")
            goto("/account")
        } else {
            alert("Uživatelské jméno nebo heslo nebyly v pořádku.")
        }
    }
</script>

<Navbar/>

<H1 text="Login"/>
<label for="email">Email:</label>
<input type="text" placeholder="e-mail" id="email" bind:value={email}/>
<label for="password">Password:</label>
<input type="password" id="password" bind:value={password}/>
<button on:click={handle_login}>Přihlásit se</button>


<style>
    input {
        display:block
    }

</style>