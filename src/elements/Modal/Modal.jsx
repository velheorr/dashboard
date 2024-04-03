import * as React from 'react';
import './modal.scss'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal} from "./ModalSlice";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {palette} from "../../utils/theme";
import {modalData} from "./modalData";


export default function TransitionsModal() {
    const dispatch = useDispatch();
    const handleClose = () => dispatch(closeModal());

    const open = useSelector(state => state.modal.open);
    const variant = useSelector(state => state.modal.variant);
    const mode = useSelector(state => state.header.mode);

    const modal_bg = mode === "dark" ?  palette.grey[500] : 'background.paper'
    const modal_color = mode === "dark" ?  palette.grey[500] : palette.black
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor:  modal_bg,
        color: modal_color,
        border: '1px solid rgba(0,0,0,.2)',
        borderLeft: '15px solid rgb(76, 178, 66)',
        boxShadow: 24,
        p: 4,
    };


    let modalText = modalData(variant)


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                disableAutoFocus={true}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='modalBtn'>
                            <IconButton onClick={handleClose} size="large" sx={{color: palette.white}}><CloseIcon fontSize='inherit'/></IconButton>
                        </div>
                        <div style={{color: mode === "dark" ?  palette.white : palette.black}}>
                            {modalText}
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
