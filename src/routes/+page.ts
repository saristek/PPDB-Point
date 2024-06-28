import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {
    async function getSeleksi(address: string) {
        const response = await fetch(`/api/seleksi?jalur=${address}`);
        return await response.json();
    }

    const jalur = url.searchParams.get('jalur') ?? 'afirmasi'
    const data = getSeleksi(jalur)
    return {
        mode: jalur,
        jalur: data
    }
};