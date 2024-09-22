import React from 'react';
import { Marker, Popup } from 'react-leaflet'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditPet from './EditPet';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MarkerCustom({ icon, data, handleRemovePet, handleEditPet, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const editPet = async (data) => {
        await handleEditPet(data).then(() => {
            handleClose();
        })
    }

    return (
        <>
            <Marker position={data.localization.coordinates} icon={icon}>
                <Popup>
                    <Stack direction="column" spacing={2}>
                        <p>
                            Nome: {data.name}, idade: {data.age}, sexo: {data.gender}
                        </p>
                        <p>Descrição: {data.description}</p>
                        <Stack direction="row" spacing={2}>
                            <Button size="small" variant="contained" onClick={handleOpen}>Editar</Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemovePet(data._id)}
                            >
                                Excluir
                            </Button>
                        </Stack>
                    </Stack>
                </Popup>
            </Marker>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditPet data={data} handleEditPet={editPet} />
                </Box>
            </Modal>
        </>
    )
}

export default MarkerCustom;