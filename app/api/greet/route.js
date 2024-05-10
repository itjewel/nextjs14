export async function GETMethod(request){
    try {
        const res = await fetch(request);
        if(!res.ok){
            throw new Error("Failed to fetch data");
        }
        return res.json();
    } catch (e) {
        if(e instanceof Error) console.log(e.message)
    }
}