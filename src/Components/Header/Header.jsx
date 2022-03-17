import React from "react";
import '../Header/Header.css';
import Box from '@mui/material/Box';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import keep from '../Header/keep.png';
import { makeStyles } from '@mui/styles';
import { connect } from "react-redux";


const useStyles = makeStyles(() => ({

    myIcon : {
     
     "@media only screen and (min-width:320px) and (max-width : 480px)" :{
        height:'0.7em !important',
        width:'0.7em !important'        
     }
    }
      
  }))




function Header(props) {

    //used for inline css using makestyles hook

    const ClassNames = useStyles();


    const Navigation = () => {

        props.listenToHeader("opened")

    }
    return (

        <div className="headcontainer">
            <Box className="firstheader">
                <MenuSharpIcon  className ={ClassNames.myIcon} fontSize="large" onClick={Navigation} />
                <img src={keep} alt="Keepimg" />
                <div className="textfundoo">{props.currentP}</div>
            </Box>

            <Box className="searchbox">

                <TextField
                    placeholder='search'
                    size="small"
                    style={{ width: '100%' }}
                    InputProps={{
                        startAdornment: (

                            <IconButton>
                                <SearchIcon />
                            </IconButton>

                        )
                    }
                    } /></Box>

            <Box className="threeicons">
                <RefreshIcon className ={ClassNames.myIcon}fontSize="large" />
                <ViewAgendaOutlinedIcon className ={ClassNames.myIcon} fontSize="large" />
                <SettingsOutlinedIcon className ={ClassNames.myIcon} fontSize="large" />
            </Box>

            <Box className="lastheader">
                <AppsIcon fontSize="large" />
                <AccountCircleIcon fontSize="large" />
            </Box>

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        currentP : state.navReducer.currentPage
    }
}

export default connect(mapStateToProps)(Header)
