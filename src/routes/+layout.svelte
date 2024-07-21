<script>
    import Navbar from '$lib/navbar/navbar.svelte';
    import FlashMessages from '$lib/flash_messages.svelte';
</script>

<main>
    <section class="container">
        <Navbar/>
        <FlashMessages/>
        <slot/>
    </section>
</main>

<style>
    :global(body) {
      margin: 0;
      padding: 0;
      background-color:antiquewhite; /* Set your desired background color here */
      font-family: Arial, sans-serif;
    }
    
    .container {
      margin: 0 auto; /* Center the container */
      width: 80%; 
    }
    
    @media (max-width: 768px) {
      .container {
        width: 100%; /* On smaller screens, the width will be 100% */
      }
    }
  </style>