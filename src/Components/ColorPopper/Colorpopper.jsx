import * as React from 'react';
import Box from '@mui/material/Box';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import Popper from '@mui/material/Popper';

const colors= ['#00ffff','#fa8072','#5f9ea0','#40e0d0','#d2b48c','#f57e42','#c91302']


export default function SimplePopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const takeColor = (e) => {
    if(props.action==='create'){
      props.listenToPopper(e.target.id)
    }else if(props.action==='update'){
      props.listenToPopper(e.target.id)
    }
    
  }

  return (
    <div>
    
      <ColorLensOutlinedIcon  aria-describedby={id} type="button" onClick={handleClick}/>
      
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: '1px solid lightgrey', p: 1, borderRadius:'8px' ,bgcolor: 'background.paper', display: "flex", flexDirection : "row",
        justifyContent : "space-evenly",}}>
          {colors.map((col) => (<div key={col} onClick={takeColor}  id={col} style ={{backgroundColor: col,width : "30px", height: "30px", borderRadius : "50%"}}></div>))}
        </Box>
      </Popper>
    </div>
  );
}