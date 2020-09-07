export async function queryWallets() {
    try {
        const result = await fetch('api/wallets/Dtn53Ebo2ULFpHWUsTAp/');
        return result.json();
    } catch (e){
        return e
    }
}
