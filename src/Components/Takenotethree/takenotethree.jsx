import { Box } from '@mui/system';
import React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Typography from "@mui/material/Typography"
import SimplePopper from '../ColorPopper/Colorpopper';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { InputBase, TextareaAutosize } from '@mui/material';
import Modal from '@mui/material/Modal';
import { updateNote, colorUpdateData, ArchiveUpdate, deleteData } from '../../services/DataService';
import { Button,IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

//import '../Takenotethree/takenotthree.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4
};

function TakeNoteThree(props) {
    const [open, setOpen] = React.useState(false);
    const [editNoteObj, setEditNoteObj] = React.useState({ title: "", description: "", id: "" })
    
    const editTitle = (e) => {
        setEditNoteObj({ ...editNoteObj, title: e.target.value })

    }
    const editDesc = (e) => {
        setEditNoteObj({ ...editNoteObj, description: e.target.value })


    }
    const handleOpen = () => {

        setEditNoteObj({ ...editNoteObj, title: props.notethree.title, description: props.notethree.description, id: props.notethree.id })

        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    console.log(props)

    const listenToPopper = (color) => {
        let data = {
            noteIdList: [props.notethree.id],
            color: color
        }
        console.log(data)
        colorUpdateData(data).then((response) => {
            props.viewFromServer(color)

            console.log(response)
        }).catch((error) => {
            console.log(error)

        })

    }

    const updateArchive = () => {
        let obj = {
            noteIdList: [props.notethree.id],
            isArchived: true
        }


        ArchiveUpdate(obj).then((response) => {
            //props.listentoArchive()
            props.viewFromServer()


            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteNote = () => {
        let trashobj = {
            noteIdList: [props.notethree.id],
            isDeleted: true
        }
        deleteData(trashobj).then((response) => {
            props.viewFromServer()
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    const updateApi = () => {
        console.log(props.notethree.id)
        const data = new FormData()
        data.append('title', editNoteObj.title)
        data.append('description', editNoteObj.description)
        data.append('noteId', editNoteObj.id)
        console.log(editNoteObj.title, editNoteObj.description)

        updateNote(data).then((response) => {

            console.log(response)
            props.viewFromServer()
            handleClose()
        })
            .catch((error) => {
                console.log(error)
            })
        console.log(data)
        handleClose()
    }

    return (



        <Card
            sx={{
                display: 'flex',
                flexWrap: 'wrap', backgroundColor: props.notethree.color, border: '1px solid black',
                width:'80%',
                justifyContent: 'space-between',
                paddingBottom: '2px'
            }}>
            <CardContent style={{ width: '100%', padding: '10px' }}>
                <Typography >
                    <InputBase value={props.notethree.title} onClick={handleOpen}
                        style={{
                            backgroundColor: props.notethree.color,
                            width: '100%',
                            height: '100%', outline: 'none', border: 'none',
                            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                        }}
                    />
                    <InputBase
                        placeholder="Take a Notes..."
                        value={props.notethree.description}
                        style={{
                            width: '100%',
                            height: '100%', outline: 'none', border: 'none',
                            display: 'flex', alignItems: 'center',
                            backgroundColor: props.notethree.color
                        }} onClick={handleOpen}
                    />

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <InputBase onChange={editTitle} defaultValue={editNoteObj.title}></InputBase>
                            </Typography>
                            <Typography id="modal-modal-description" >
                                <InputBase onChange={editDesc} defaultValue={editNoteObj.description}></InputBase>
                            </Typography>
                            <Typography>
                                <AddAlertOutlinedIcon />
                                <PersonAddAltOutlinedIcon />
                                <ColorLensOutlinedIcon />
                                <ImageOutlinedIcon />
                                <ArchiveOutlinedIcon />
                                <MoreVertOutlinedIcon />
                                <UndoOutlinedIcon />
                                <RedoOutlinedIcon />
                                <Button onClick={updateApi}  >Close </Button></Typography>
                        </Box>
                    </Modal>
                </Typography>

                <CardActions
                    style={{ padding: '0' }}
                    sx={{ backgroundColor: props.notethree.color }}>
                    <AddAlertOutlinedIcon />
                    <PersonAddAltOutlinedIcon />
                    <IconButton><SimplePopper listenToPopper={listenToPopper} action='update' /></IconButton>
                    <ImageOutlinedIcon />
                    <IconButton><ArchiveOutlinedIcon onClick={updateArchive} /></IconButton>
                    <IconButton><DeleteOutlineIcon onClick={deleteNote} /></IconButton>
                </CardActions>
            </CardContent>
        </Card>

    )
}
export default TakeNoteThree