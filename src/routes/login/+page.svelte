<script>
    import H1 from "$lib/h1.svelte";
    import { goto } from '$app/navigation';
    import { PUBLIC_API_URL } from "$env/static/public"
    import { addMessage } from '$lib/stores/messages.js';
    import { setRoles } from '$lib/stores/roles.js';


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
            setRoles(data.roles)
            addMessage("success", "Přihlášení proběhlo úspěšně.")
            goto("/account") // i need to force a reload here
        } else {
            addMessage("error", "Přihlášení se nezdařilo.")
        }
    }
</script>

<div class="container">
    <H1 text="Login"/>
    <label for="email">Email:</label>
    <input type="text" placeholder="e-mail" id="email" bind:value={email}/>
    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password}/>
    <button on:click={handle_login}>Přihlásit se</button>
</div>


<style>
    input {
        margin: 10px;
        border-radius: 5px;
        border-color: red;
        padding: 5px;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    button {
        margin: 10px;
        padding: 5px;
        border-radius: 5px;
        border-color: red;
        background-color: white;
    }

</style>