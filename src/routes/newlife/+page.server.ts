/** @type {import('./$types').Actions} */

// lida com o formulário e executa o fetch
export const actions: import('./$types').Actions = {
    default: async({ request }) => {
        let erro = false;

        // pega o CPF passado pelo input
        const formData = await request.formData();
        const cpf = formData.get('cpf');

        // trata o número informado (caso menor que 1000 ou igual a 99999999999, passa um valor não esperado no endpoint, o que retorna em erro)
        let doc: FormDataEntryValue | null;
        if(Number(cpf) === 99999999999 || Number(cpf) < 1000){
            return { erro }
        }else{
            doc = cpf;
        }

        // fetch token
        const getToken = async () => {
            const tokenRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSAutenticacao.rule?sys=MK0&token=004e1e43eeabb77526992637db07635a&password=3687777e73e3415&cd_servico=9999`);
            const tokenData = await tokenRes.json();
            return tokenData.Token;
        }

        // passa o token para a variável
        const token = await getToken();
        // console.log('token: ' + token)

        // fetch API em busca do código do cliente
        const codClientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaDoc.rule?sys=MK0&token=${token}&doc=${doc}`);
        const codClientData = await codClientRes.json();

         /* 
            tratamento de exceções:
                - codClientRes.ok: trata se a busca de dados retornou código 200 (ok) ou maior do de 299 (erro).
                - codClientData.status: forma como a API exibe o erro.
        */
       let codCliente;
        // console.log('codClientRes.ok: ' + codClientRes.ok)
        // console.log('codClientData.status: ' + codClientData.status)
        if(!codClientRes.ok || codClientData.status === 'ERRO'){
            erro = true;
            return { erro }
        }else if(!(codClientData.Outros.length === 0)){
            codCliente = codClientData.Outros[0].CodigoPessoa;
        }else{
            codCliente = codClientData.CodigoPessoa;
        }

        // console.log('codCliente: ' + codCliente)
        const clientRes = await fetch(`https://sac.newlifefibra.com.br//mk/WSMKContratosPorCliente.rule?sys=MK0&token=${token}&cd_cliente=${codCliente}`);
        // console.log('clientRes: ' + clientRes)
        const clientData = await clientRes.json();
        // console.log('clientData: ' + clientData)
        // fetch API (endpoint lista clientes: https://documentacao.mksolutions.com.br/display/MK30/APIs+gerais#APIsgerais-LISTARCLIENTES)
        // const clientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaClientes.rule?sys=MK0&token=${token}&doc=${doc}`);
        // const clientData = await clientRes.json();

        /* 
            tratamento de exceções:
                - clientRes.ok: trata se a busca de dados retornou código 200 (ok) ou maior do de 299 (erro).
                - clientData.status: forma como a API exibe o erro.
        */
        console.log('clientRes.ok: ' + clientRes.ok)
        console.log('clientData.status: ' + clientData.status)
        if(!clientRes.ok || clientData.status === 'ERRO'){
            erro = true;
            return { erro }
        }
        
        console.log('clientData.ContratosAtivos.length: ' + clientData.ContratosAtivos.length)
        if(!(clientData.ContratosAtivos.length === 0)){
            let fullName = clientData.Nome;
            let nomes = fullName.split(' ');
            let nome = nomes[0].toUpperCase();

            return { nome }
        }else{
            erro = true;
            return { erro }
        }
    }
}
