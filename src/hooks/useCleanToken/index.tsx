export default function useCleanToken () {
    sessionStorage.removeItem('token');
};