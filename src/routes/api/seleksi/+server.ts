import { json, text, type RequestHandler } from '@sveltejs/kit'

// /api/seleksi GET
export const GET: RequestHandler = async (event) => {
    let jalur;

    switch (event.url.searchParams.get('jalur')) {
        case 'afirmasi':
            jalur = 'af'
            break;
        case 'prestasi':
            jalur = 'pr'
            break;
        default:
            break;
    }

    const data = await event.fetch(`https://bantulkab.siap-ppdb.com/seleksi/${jalur}/smp/1-22040051-0.json`)

    return json(await data.json())
}

// /api/seleksi POST
export const POST: RequestHandler = async ({ request }) => {
    const { a, b } = await request.json();
    return json(a + b);
}

export const fallback: RequestHandler = async ({ request }) => {
    return text(`I caught your ${request.method} request!`);
}

