export default function useGetToken () {
    return sessionStorage.getItem('token');
};