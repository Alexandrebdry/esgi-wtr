import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function ({route}) {
    const navigate = useNavigate() ;

    useEffect(() => {
        window.scroll(0, 0) ;
        navigate(route) ;
    },[]) ;

}