
import UIM from './ui.js'
const { ipcRenderer } = require('electron')

let Listener = {}
Listener.scale = 1 //initial scale

function onclickListeners(){
    document.onclick = async (e)=> {
        //console.log(e.target)
       //if (e.target.matches(".svg4")) UIM.drawLineDirection()
    }

    document.ondblclick = async (e)=> {
        console.log(e.target)
        
        if (e.target.matches(".maincontent")) {
            e.preventDefault()
            e.stopPropagation()
            
            UIM.addTextBox(e)
        }
    }
}
Listener.onclickListeners = onclickListeners

function setKeyListeners(){
    /*
    let input = document.getElementById("input")
    input.onkeydown = (e)=>{
        if(e.key === 'Enter') UIM.showCalendar()
    }
    
    document.onkeyup = (e)=>{
        if(e.key === 'ArrowLeft') UIM.showPreviousCalendar()
        else if(e.key === 'ArrowRight') UIM.showNextCalendar()
    } 
    */
}
Listener.setKeyListeners = setKeyListeners

function setIpcRendererOn(){
    ipcRenderer.on("showAbout",(event)=>{
       // UIM.showAbout()
    })
}
Listener.setIpcRendererOn = setIpcRendererOn


function setScrollListeners(){
    document.onwheel = (event)=>{
  /*
        event.preventDefault()
        //console.log(event)
      
        let delta = event.deltaY * -0.0005
        console.log(event.deltaY, delta)
        Listener.scale += delta
        
        // Restrict scale
        Listener.scale = Math.min(Math.max(.125, Listener.scale), 2)

        // Apply scale transform to whole group 
        let maincontentdiv = document.querySelector("#maincontent")
        maincontentdiv.style.transform = `scale(${Listener.scale})`
*/
    }
}



Listener.setScrollListeners = setScrollListeners

export default Listener