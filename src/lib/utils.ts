export async function client(query:string,variables?:object){
    const res = await fetch('https://api-sa-east-1.hygraph.com/v2/cl8vmvquh6t1j01uqabrvab81/master',{
        method: "POST",
        body: JSON.stringify({query,variables})
    })
    const {data} = await res.json();

    return data
}

