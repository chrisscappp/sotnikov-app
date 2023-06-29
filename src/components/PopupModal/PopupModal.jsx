import { memo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './style.css'

const PopupModal = ({setShow, width, children}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: width,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (
        <div>
          <Modal
              open={setShow}
              onClose={setShow}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style} className = "modal-wrapper">
              {children}
            </Box>
          </Modal>
        </div>
    )
}

export default memo(PopupModal)