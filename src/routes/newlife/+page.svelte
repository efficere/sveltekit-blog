<script>
	/*
		SISTEMA PARA CONSULTA DE CLIENTES ATIVOS v0.0.1
			- Consulta somente clientes ativos baseado no CPF informado e retorna o primeiro nome do mesmo.
			- Baseado na API oficial do MK.
	*/

	/** @type {import('./$types').ActionData} */
	export let form;
</script>
<svelte:head>
	<title>Base de clientes - New Life Fibra</title>
	<link rel="shortcut icon" href="/img/favicon.webp" type="image/x-icon">
</svelte:head>

<div class="container mx-auto px-5 md:p-0 flex items-center justify-center h-screen w-screen">
	<form method="POST" class="flex flex-col gap-10 min-h-[20rem] min-w-[20rem] w-full max-w-[35rem] shadow-xl shadow-black/10 rounded-3xl p-10 items-center justify-center border-t-4 border-red-500">
		<div class="flex flex-col items-center justify-center">
			<img src="/img/logo-azul.webp" class="max-w-[12.5rem]" alt="">
			<div class="leading-snug flex flex-col gap-2">
				<h1 class="text-center text-xl md:text-2xl lg:text-3xl font-etelkaTextPro font-bold">Base de clientes</h1>
				<p class="text-justify">Consulte nossa base de dados e ofereça descontos aos clientes New Life Fibra.</p>
			</div>
		</div>
		<div class="flex flex-col items-center gap-10 w-full">
			<fieldset class="flex flex-col gap-2 w-full">
				<label for="cpf" class="w-full text-center leading-snug md:leading-normal md:text-left font-bold md:text-lg">CPF {'('}somente números, sem pontuação{')'}</label>
				<input type="text" id="cpf" name="cpf" placeholder="Digite o CPF somente números..." class="w-full p-2 rounded-lg border border-black/20" required pattern="^[0-9]{'{11}'}$" maxlength="11">
			</fieldset>
			<button type="submit" class="btn btn-primary w-2/4 bg-azul-2 border-azul-3 hover:bg-azul-1 hover:border-azul-3">Conferir</button>
		</div>
		<div class="h-full max-h-[2rem]">
			{#if form?.nome && !form?.erro}
				<p class="text-green-500 text-center"><span class="font-bold">{form?.nome}</span> é cliente ativo New Life Fibra!</p>
			{:else if form?.erro}
				<p class="text-red-500 text-center"><span class="font-bold">CPF não encontrado</span> em nossa base de dados</p>
			{/if}
		</div>
		<p class="text-center">Obrigado por fazer parte da nossa história! :{')'}</p>

	</form>
</div>

<style>
	p, label{
		@apply font-poppins;
	}
</style>