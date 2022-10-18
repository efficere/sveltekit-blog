/** @type {import('./$types').Actions} */

// lida com o formulário e executa o fetch
export const actions: import('./$types').Actions = {
    default: async({ request }) => {
        // pega o CPF passado pelo input
        const formData = await request.formData();
        const cpf = formData.get('cpf');
        let doc: FormDataEntryValue | null;
        if(Number(cpf) > 999){
            doc = cpf;
        }else{
            doc = "erro";
        }
        const getToken = async () => {
            const tokenRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSAutenticacao.rule?sys=MK0&token=004e1e43eeabb77526992637db07635a&password=3687777e73e3415&cd_servico=9999`);
            const tokenData = await tokenRes.json();
            return tokenData.Token;
        }
    
        // consulta a API em busca do nome na base de clientes
        // passa o token para a variável
        const token = await getToken();
        const clientRes = await fetch(`https://sac.newlifefibra.com.br/mk/WSMKConsultaClientes.rule?sys=MK0&token=${token}&doc=${doc}`);
        const clientData = await clientRes.json();

        let erro: Boolean;
        if(!clientRes.ok || clientData.status === 'ERRO'){
            erro = true;
        }else{
            erro = false
        }
        
        if(!erro){
            return { clientData }
        }else if(erro){
            return { erro}
        }
    
    }
}
