/** @type {import('./$types').PageLoad} */

export async function load(){
    const res = await fetch("https://api-sa-east-1.hygraph.com/v2/cl8vmvquh6t1j01uqabrvab81/master",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            query:
              `
                query Post {
                  post(where: {id: "cl8x1tdqi17w40akpwddpthnt"}) {
                    resumo
                    slug
                    titulo
                    imgDestaque
                  }
                }
              `
        })
    });

    const {post} = await res.json();
    
    return{
        props:{
          post
        }
    }
}