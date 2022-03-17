import axios from 'axios'

const headerconfig={

    headers:{

        Authorization:localStorage.getItem("token")
    }
}

export const getNotes=()=>{
		
    let response=axios.get("http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",headerconfig)
    return response
}
export const postNotes=(data)=>{

    let response=axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",data,headerconfig)
    return response
}

export function updateNote(data)
{
    console.log(data)    
    let response=axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",data,headerconfig)
    return response;
} 


export const ArchiveUpdate = async(archiveobj) => {
    let response=await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",archiveobj,headerconfig)
    return response
  } 

  export const deleteData= async(trashobj) => {
    let response=await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",trashobj,headerconfig)
    return response
  } 

  export const colorUpdateData= async(colorobj) => {
    let response=await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",colorobj,headerconfig)
    return response
  } 
 

