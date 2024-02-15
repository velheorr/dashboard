import {useDispatch} from "react-redux";
import {openModal} from "../elements/Modal/ModalSlice";


export const useModal = ()=> {
    const dispatch = useDispatch()

    return dispatch(openModal())
}