export default function useSaveToken () {
    return (token: string) => {
        sessionStorage.setItem('token', token);
    };
};