<script>
// @ts-nocheck

      /** @type {import('./$types').PageData} */
    export let data;

    const fetchPromise=fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

    console.log(fetchPromise);

    fetchPromise.then((response)=>{
        console.log(`Received response: ${response.status}`);
    })

    console.log("Started request...");

</script>

<h1 class="text-3xl">{data.slug}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
