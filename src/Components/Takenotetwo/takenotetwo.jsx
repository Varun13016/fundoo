import React from 'react';
import '../Takenotetwo/takenotetwo.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import SimplePopper from '../ColorPopper/Colorpopper';
import { postNotes } from '../../services/DataService'
import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';



function TakeNotetwo(props) {

    const [heading, setHeading] = React.useState({ color: "", title: "", description: "", isArchived: false })
    const sendApi = () => {

        const data = new FormData()
        data.append('title', heading.title)
        data.append('description', heading.description)
        data.append('isArchived', heading.isArchived)

        postNotes(heading).then((response) => {
            console.log(response)
            props.listenTakenoteTwo()
            props.viewFromServer()

        }).catch((err) => {
            console.log(err)
            props.listenTakenoteTwo()
        })
    }
    const createArchive = (data) => {

        setHeading({ ...heading, isArchived: true })
        console.log(data)
    }

    const listenToPopper = (data) => {
        console.log(data)
        setHeading({ ...heading, color: data })
    }

    const takeTitle = (e) => {
        setHeading({ ...heading, title: e.target.value })
    }

    const takeDesc = (e) => {
        setHeading({ ...heading, description: e.target.value })
    }


    return (
        <Box className='notetwobox'sx={{ backgroundColor: heading.color }}> 

            <Box className='singleicon' >
                <div className='Rowone'>

                    <Box id='Rowone'>
                        <InputBase
                            onChange={takeTitle}
                            placeholder="Title"
                            //style={{ backgroundColor: heading.color }}
                        />
                    </Box>
                    
                    <Box
                        sx={{
                            width: '10%',
                            height: '100%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            //marginRight: '10px'

                        }}>
                        <PushPinIcon />
                    </Box>
                </div>
            </Box>

            <Box className='notetwosearch'>
                <InputBase
                    onChange={takeDesc}
                    placeholder="Take a Note..."
                    //style={{ backgroundColor: heading.color }}
                />
            </Box>

            <Box className='notetwoicon'>
                
                <div className='icons'>
                    <Box id='icons' >
                        <AddAlertOutlinedIcon />
                        <PersonAddAltOutlinedIcon />
                        <IconButton><SimplePopper listenToPopper={listenToPopper} action='create' /></IconButton>
                        <ImageOutlinedIcon />
                        <IconButton><ArchiveOutlinedIcon onClick={createArchive} /></IconButton>
                        <MoreVertOutlinedIcon />
                        <UndoOutlinedIcon />
                        <RedoOutlinedIcon />
                    </Box>
                    <Box className='close'>
                       
                        <Button size="small" onClick={sendApi}  >Close </Button>
                    </Box>
                </div>
            </Box>
        </Box>
    )
}
export default TakeNotetwo

