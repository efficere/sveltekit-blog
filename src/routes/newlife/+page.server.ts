/** @type {import('./$types').Actions} */

// lida com o formulário e executa o fetch
export const actions: import('./$types').Actions = {
    default: async({ request }) => {
        // pega o CPF passado pelo input
        const formData = await request.formData();
        const cpf = formData.get('cpf');

        // // trata o número informado (caso menor que 999, passa um valor não esperado no endpoint, o que retorna em erro)
        // let doc: FormDataEntryValue | null;
        // if(Number(cpf) > 999){
        //     doc = cpf;
        // }else{
        //     doc = "erro";
        // }

        // fetch token
        const getToken = async () => {
            const tokenRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSAutenticacao.rule?sys=MK0&token=004e1e43eeabb77526992637db07635a&password=3687777e73e3415&cd_servico=9999`);
            const tokenData = await tokenRes.json();
            return tokenData.Token;
        }
    
        // passa o token para a variável
        const token = await getToken();
        // fetch API (endpoint lista clientes: https://documentacao.mksolutions.com.br/display/MK30/APIs+gerais#APIsgerais-LISTARCLIENTES)
        const clientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaClientes.rule?sys=MK0&token=${token}&doc=${cpf}`);
        const clientData = await clientRes.json();

        /* 
            tratamento de exceções:
                - clientRes.ok: trata se a busca de dados retornou código 200 (ok) ou maior do de 299 (erro).
                - clientData.status: forma como a API exibe o erro.
        */
        let erro: Boolean;
        if(!clientRes.ok || clientData.status === 'ERRO'){
            erro = true;
        }else{
            erro = false
        }
        
        // caso sucesso, retorna somente o primeiro nome do cliente para ser exibido, caso contrário, retorna erro (que é manipulado no front)
        if(!erro){
            let fullName = clientData[0].Nome;
            let nomes = fullName.split(' ');
            let nome = nomes[0];

            return { nome }
        }else if(erro){
            return { erro}
        }
    
    }
}
