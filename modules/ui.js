/**
 * User interface manager
 * */

 import EVM from './eventmanager.js' 


const notify = new AWN()

class UIM{}


//-----------------a-------------------


//-----------------c-------------------
function clearInputDiv(){
    //document.querySelector(".evinputdiv").innerHTML = ""
    document.querySelector(".evinputdiv").style.display = "none"
}

//--------------g-----------------
function getCloseButton(){
    let button = document.createElement("button")
    button.classList = "closebutton"
    button.innerHTML = "Cancel"
    
    button.onclick = (e)=>{
      e.preventDefault()
      clearInputDiv()
    }
    return button
}
function getYearADorBC(event){
    let startdate = new Date(event.startdate)
    let year = startdate.getFullYear()
    let absyear = Math.abs(year)

    //year = parseInt(year,10)
    //console.log(year, typeof year == "number")
    let yearadbc = absyear+""
    if(year <0) yearadbc += " BC"
    else yearadbc += " CE"

    return yearadbc
}
function getEventRow(event=null){
    let rowdiv = document.createElement("div")
    rowdiv.classList.add("rowdiv")

    let datediv = document.createElement("div")
    datediv.classList.add("datediv")
    rowdiv.appendChild(datediv)

    let titlediv = document.createElement("div")
    titlediv.classList.add("titlediv")
    rowdiv.appendChild(titlediv)
    
    let descrdiv = document.createElement("div")
    descrdiv.classList.add("descrdiv")
    descrdiv.innerHTML = "ADD EVENT +"
    rowdiv.appendChild(descrdiv)
    
    if(event){
        let year = getYearADorBC(event)
        datediv.innerHTML = year
        titlediv.innerHTML = event.title
        descrdiv.innerHTML = event.descripiton

    }

    if(!event){
        descrdiv.onclick = async (e)=>{
            await showEventInputDiv(e)
        }
    }

    return rowdiv
}
async function getEventDates(){
    let events = await EVM.getEvents()
    if(!events) return null

    let eventdates = []
    for(let ev of events){
        let startdate = new Date(ev.startdate)
        eventdates.push({startdate:startdate,event:ev})
    }
    let docascends = eventdates.sort((a,b)=>a.startdate.getTime()-b.startdate.getTime())
    return docascends
}
//--------------s-----------------
async function showEventInputDiv(e){
    console.log("hello")
    let evinputdiv = document.querySelector(".evinputdiv")
    if(evinputdiv) {
        evinputdiv.style.display = "flex"
        return
    }

    //if no ev inputdiv found, create new one
    evinputdiv = document.createElement("div")
    evinputdiv.classList.add("evinputdiv")
    evinputdiv.style.display = "flex"

    //title input
    let titleinput = document.createElement("input")
    titleinput.type = "search"
    titleinput.placeholder = "Event title"
    evinputdiv.appendChild(titleinput)

    //input for event descripiton 
    let textarea = document.createElement("textarea")
    textarea.placeholder = "Event description"
    evinputdiv.appendChild(textarea)

    //start date
    let label = document.createElement("label")
    label.innerHTML = "Start date"
    evinputdiv.appendChild(label)
    let startdateinput = document.createElement("input")
    startdateinput.type = "search"
    startdateinput.placeholder = "eg: -00600/01/01"
    startdateinput.title = "For BCE: -00600/01/01, For CE: 99/01/06"
    evinputdiv.appendChild(startdateinput)

    //end date
    let label2 = document.createElement("label")
    label2.innerHTML = "End date"
    evinputdiv.appendChild(label2)
    let enddateinput = document.createElement("input")
    enddateinput.type = "search"
    enddateinput.placeholder = "eg: 99/01/06"
    enddateinput.title = "For BCE: -00600/01/01/BCE, For CE: 99/01/06"
    evinputdiv.appendChild(enddateinput)

    //places
    let label3 = document.createElement("label")
    label3.innerHTML = "Location"
    evinputdiv.appendChild(label3)
    let placeinput = document.createElement("input")
    placeinput.type = "search"
    placeinput.placeholder = "newyork;otawa;..."
    evinputdiv.appendChild(placeinput)

    //buttons
    let buttondiv = document.createElement("div")
    buttondiv.classList = "evinputbuttondiv"
    let okbutton = document.createElement("button")
    okbutton.innerHTML = "OK"
    okbutton.onclick = async ()=> {
        let event = getEvent()
        if(event) {
            let inserteddoc = await EVM.insertEvent(event)
            if(inserteddoc) {
                new AWN().success("Event inserted successfully")
            }
            else {
                new AWN().warning("Event insertion failed!")
            }
        }
    }
    let cancelbutton = getCloseButton()

    buttondiv.appendChild(okbutton)
    buttondiv.appendChild(cancelbutton)
    evinputdiv.appendChild(buttondiv)

    let infodiv = document.createElement("div")
    evinputdiv.appendChild(infodiv)

    document.body.appendChild(evinputdiv)

    

    function getEvent() {
        let title = titleinput.value
        let testing = false

        if (!testing && (title == null || title == "")) {
            infodiv.innerHTML = "title undefined!"
            return null
        }

        let descripiton = textarea.value
        if (!testing && (descripiton == null || descripiton == "")) {
            infodiv.innerHTML = "descripiton undefined!"
            //return null
        }
        
        let startdate = startdateinput.value
        if (!testing && (startdate == null || startdate == "")) {
            infodiv.innerHTML = "startdate undefined!"
            return null
        }
        
        let enddate = enddateinput.value
        if (!testing && (enddate == null || enddate == "")) {
            infodiv.innerHTML = "enddate undefined!"
            return null
        }
        
        let places = placeinput.value
        if (!testing && (places == null || places == "")) {
            infodiv.innerHTML = "places undefined!"
            //return null
        }
        
        let event = {
            title:title,
            descripiton:descripiton,
            places:places,
            startdate:startdate,
            enddate:enddate
        }
        
        infodiv.innerHTML = "" //reset

        return event
    }
    
}
async function showEvents(){
    let eventdates = await getEventDates()
    console.log(eventdates)

    //if events are empty, show add event row
    let maincontendiv = document.querySelector(".maincontent")
    let rowdiv = getEventRow()
    maincontendiv.appendChild(rowdiv)

    if(eventdates){
        for(let ev of eventdates){
            let rowdiv = getEventRow(ev.event)
            maincontendiv.appendChild(rowdiv)
        }
    }
   

}
UIM.showEvents = showEvents

export default UIM