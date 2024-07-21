<script>
    import H1 from "$lib/h1.svelte"
    import { PUBLIC_API_URL } from "$env/static/public"
    import { addMessage } from '$lib/stores/messages.js';
    import { goto } from '$app/navigation';


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
                addMessage("success", "Registrace proběhla úspěšně. Můžete se nyní přihlásit.")
                goto("/login")
                break
            case 409:
                addMessage("error", "Uživatel s tímto emailem již existuje.")
                break
            default:
                addMessage("error", "Registrace se nezdařila.")
        }
    }
</script>

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