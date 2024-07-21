<script>
    import Navbar from '$lib/navbar/navbar.svelte';
    import H1 from "$lib/h1.svelte"
    import { PUBLIC_API_URL } from "$env/static/public"

    let email = ""
    let password = ""

    async function handle_login() {
        let response = await fetch(PUBLIC_API_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        let data = await response.json()
        switch (response.status) {
            case 201: 
                alert("Nový uživatel zaregistrován. Můžete se nyní přihlásit.")
                break
            case 409:
                alert("Tento e-mail už je zaregistrovaný.")
                break
            default:
                alert("Nečekaná chyba, detaily hledej v konzoli.")
        }
    }
</script>

<Navbar/>

<H1 text="Register"/>
<label for="email">Email:</label>
<input type="text" placeholder="e-mail" id="email" bind:value={email}/>
<label for="password">Password:</label>
<input type="password" id="password" bind:value={password}/>
<button on:click={handle_login}>Zaregistrovat se</button>


<style>
    input {
        display:block
    }

</style>