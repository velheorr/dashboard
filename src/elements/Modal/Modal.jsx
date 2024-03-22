import * as React from 'react';
import './modal.scss'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal} from "./ModalSlice";
import BlockShadow from "../BlockShadow";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {palette} from "../../utils/theme";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,.2)',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    /*const [open, setOpen] = React.useState(false);*/
    const dispatch = useDispatch();
    const handleOpen = () => dispatch(openModal());
    const handleClose = () => dispatch(closeModal());

    const open = useSelector(state => state.modal.open);


    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
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
                            <Typography id="transition-modal-title" variant="h6" component="h1">
                                ***** negro.
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                123456
                            </Typography>
                        </Box>
                </Fade>
            </Modal>
        </div>
    );
}
