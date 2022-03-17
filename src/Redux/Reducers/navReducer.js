
const intialState = {
    currentPage: "Fundoo",
    data:[]
}

export const navReducer = (state=intialState,actions) => {

    switch(actions.type) {
        
        case 'Clicked_On_Notes' :
            return {...state, currentPage : "Notes"}
        case 'Clicked_On_Archive' :
                return {...state, currentPage : actions.payload}
        case 'Clicked_On_Trash' :
                    return {...state, currentPage : "Trash"}
        default :
        return state

    }

}