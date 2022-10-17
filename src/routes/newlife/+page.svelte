<script>
	/** @type {import('./$types').ActionData} */
	export let form;
	let ativo = false;
</script>
2
<div class="container mx-auto flex items-center justify-center h-screen w-screen">
	<form method="POST" class="flex flex-col gap-20 min-h-[20rem] min-w-[20rem] border border-black">
		<div class="logos">
			<img src="/logo-azul.webp" class="max-w-[12.5rem]" alt="">
			<img src="" alt="">
		</div>
		<div class="body flex flex-col gap-10 text-center">
			<fieldset class="flex flex-col gap-2 items-center w-full">
				<label for="cpf">CPF (somente números, sem pontuação)</label>
				<input type="text" id="cpf" name="cpf" placeholder="Digite o CPF somente números..." class="w-full" required pattern="^[0-9]{'{11}'}$" maxlength="11">
			</fieldset>
			<button type="submit">Enviar dados</button>
		</div>
		{#if form?.clientData && !form?.erro}
			<p class="text-green-500"><span class="font-bold">{form?.clientData[0].Nome}</span> é cliente ativo New Life Fibra</p>
		{:else if form?.erro}
			<p class="text-red-500">CPF não encontrado em nossa base de dados</p>
		{/if}
	</form>
</div>