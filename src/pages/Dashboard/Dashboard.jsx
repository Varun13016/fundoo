import React from "react";
import Header from "../../Components/Header/Header";
import TakeNotetwo from "../../Components/Takenotetwo/takenotetwo";
import TakeNoteone from "../../Components/Takenoteone/takenoteone";
import TakeNoteThree from "../../Components/Takenotethree/takenotethree";
import './Dashboard.css'
import { getNotes, } from '../../services/DataService';
import { Box, Grid, } from "@mui/material";
import MiniDrawer from "../../Components/Sidenav/sidenav";


function DashBoard() {
    const [viewnotes, setViewnotes] = React.useState(false)
    // const [notes, setNotes] = React.useState([])
    const [filters, setFilters] = React.useState([])
    const [openSidebar, setopenSidebar] = React.useState(false)
    const [presentPage, setpresentPage] = React.useState("notes")


    const listenToSidebar = (value) => {
        console.log(value)
        //setopenSidebar(!openSidebar)
        setpresentPage(value)
    }


    const viewFromServer = () => {
        getNotes().then((response) => {
            let filter = []

            if (presentPage === "notes") {
                console.log("success")

                filter = response.data.data.data.filter(function (notethree) {
                    if (notethree.isArchived === false && notethree.isDeleted === false) {
                        return (notethree)
                    }

                })
            }
            else if (presentPage === "archive") {


                console.log("archived")


                filter = response.data.data.data.filter(function (notethree) {
                    if (notethree.isArchived === true && notethree.isDeleted === false) {
                        return (notethree)
                    }

                })
            }
            else if (presentPage === "trash") {


                console.log("deleted")


                filter = response.data.data.data.filter(function (notethree) {
                    if (notethree.isArchived === false || notethree.isDeleted === true) {
                        return (notethree)
                    }

                })
            }

            setFilters(filter)


        }).catch((err) => {
            console.log(err)
        })
        console.log(filters)
    }


    React.useEffect(() => {
        viewFromServer()

    }, [presentPage])

    const listenTakenoteOne = () => {
        setViewnotes(true)
    }
    const listenTakenoteTwo = () => {
        setViewnotes(false)
    }

    const listentoArchive = (data) => {
        viewFromServer(data)
    }

    const listenToHeader = (data) => {
        console.log(data)
        setopenSidebar(!openSidebar)
    }

    return (
        <div>

            <Header listenToHeader={listenToHeader} />
            <MiniDrawer openSidebar={openSidebar} listenToSidebar={listenToSidebar} />

            <div className="takenotecontainer">
                {viewnotes ? <TakeNotetwo listenTakenoteTwo={listenTakenoteTwo} viewFromServer={viewFromServer} /> : <TakeNoteone listenTakenoteOne={listenTakenoteOne} />}
            </div>

            <Box className="mappinbox" >

                <Grid
                    container columnSpacing={6} rowSpacing={3} >

                    {filters.map((notethree) => (
                        <Grid item xs={12} sm={6} md={3}><TakeNoteThree notethree={notethree} viewFromServer={viewFromServer} listentoArchive={listentoArchive} />
                        </Grid>
                    ))}

                </Grid>
            </Box>


        </div>
    )
}

export default DashBoard
