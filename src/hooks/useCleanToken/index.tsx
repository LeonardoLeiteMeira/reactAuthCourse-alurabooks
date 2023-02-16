export default function useCleanToken () {
    return ()=>{
        sessionStorage.removeItem('token');
    }
};