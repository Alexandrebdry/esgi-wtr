import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const useScrollNavigate =  () => {
    const navigate = useNavigate() ;

    const scrollNavigate = useCallback( (path) => {
        navigate(path);
        window.scrollTo(0,0 );

    },[navigate]);

    return (
        scrollNavigate
    )

}
export default useScrollNavigate ;