/** @type {import('./$types').Actions} */

// lida com o formulário e executa o fetch
export const actions: import('./$types').Actions = {
    default: async({ request }) => {
        /*

            Variável para controle de exceções.

        */
        let erro = false;


        /*

            Recupera o CPF passado pelo input, trata formatos inválidos e armazena na variável.

        */

        const formData = await request.formData();
        const cpf = formData.get('cpf');
        // console.log('cpf: ' + cpf);
        let doc: FormDataEntryValue | null;
        if(Number(cpf) === 99999999999 || Number(cpf) < 1000){
            erro = true;
            return { erro }
        }else{
            doc = cpf;
        }


        /*

            Gera novo token a cada nova pesquisa e armazena na variável.

        */

        const getToken = async () => {
            const tokenRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSAutenticacao.rule?sys=MK0&token=004e1e43eeabb77526992637db07635a&password=3687777e73e3415&cd_servico=9999`);
            const tokenData = await tokenRes.json();
            return tokenData.Token;
        }
        const token = await getToken();
        // console.log('token: ' + token)


        /*

            Busca código do cliente por CPF, trata exceções e armazena o código na variável
                - codClientRes.ok: trata se a busca de dados retornou código 200 (ok) ou maior do de 299 (erro).
                - codClientData.status: forma como a API exibe o erro.
                - if(!(codClientData.Outros.length === 0)): caso houver mais de um código para o cliente, pega o código do primeiro item do array Outros (que é o cliente mais recente).

        */

        const codClientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaDoc.rule?sys=MK0&token=${token}&doc=${doc}`);
        const codClientData = await codClientRes.json();
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


        /*

            Busca contratos por código do cliente, trata exceções e retorna o primeiro nome do cliente em caixa alta.
                - clientRes.ok: trata se a busca de dados retornou código 200 (ok) ou maior do de 299 (erro).
                - clientData.status: forma como a API exibe o erro.
                - if(!(clientData.ContratosAtivos.length === 0)): se houver contrato, retorne o nome, caso contrário, retorne erro.

        */
        // console.log('codCliente: ' + codCliente)
        const clientRes = await fetch(`https://sac.newlifefibra.com.br//mk/WSMKContratosPorCliente.rule?sys=MK0&token=${token}&cd_cliente=${codCliente}`);
        // console.log('clientRes: ' + clientRes)
        const clientData = await clientRes.json();
        // console.log('clientData: ' + clientData)

        // console.log('clientRes.ok: ' + clientRes.ok)
        // console.log('clientData.status: ' + clientData.status)
        if(!clientRes.ok || clientData.status === 'ERRO'){
            erro = true;
            return { erro }
        }
        // console.log('clientData.ContratosAtivos.length: ' + clientData.ContratosAtivos.length)
        if(!(clientData.ContratosAtivos.length === 0)){
            let fullName = clientData.Nome;
            let nomes = fullName.split(' ');
            let nome = nomes[0].toUpperCase();
            return { nome }
        }else{
            erro = true;
            return { erro }
        }


        /* 
            Endpoint e código para listagem de cliente. (OBSOLETO)         
        */
       
        // fetch API (endpoint lista clientes: https://documentacao.mksolutions.com.br/display/MK30/APIs+gerais#APIsgerais-LISTARCLIENTES)
        // const clientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaClientes.rule?sys=MK0&token=${token}&doc=${doc}`);
        // const clientData = await clientRes.json();
    }
}
