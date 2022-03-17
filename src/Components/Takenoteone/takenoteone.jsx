import React from 'react';
import '../Takenoteone/takenoteone.css';
import { InputBase, TextField, Typography } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box } from '@mui/material';
import { borderRadius, display } from '@mui/system';

function TakeNoteone(props) {

    const takeClick = () => {
        props.listenTakenoteOne()
    }
    return (
        <Box onClick={takeClick} className='noteonebox'>
            <div className='note'>
                <Box className='noteoneinput'>
                    
                    <InputBase
                        placeholder="Take a note..."
                        style={{
                            width: '100%',
                            outline: 'none', border: 'none',
                            display: 'flex', alignItems: 'center'
                        }} /
                    >


                </Box>
                <Box className='noteoneicons'>

                    <CheckBoxOutlinedIcon fontSize='large' />
                    <BrushOutlinedIcon fontSize='large' />
                    <ImageOutlinedIcon fontSize='large' />
                </Box>
            </div>
        </Box>

    )
}
export default TakeNoteone

