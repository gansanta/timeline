
import NEDB from './nedb.js'


let EVM = {}



let evmdb = path.join(process.resourcesPath,"assets","db","evdb.db") //"./db/evdb.db"

class Event{
    constructor(title,description,places,startdate,enddate){
        this.title = title
        this.description = description
        this.places = places
        this.startdate = startdate
        this.enddate = enddate
    }
}


async function getEvents(){
    let keys = null //[{firstword:firstword},{lastword:lastword}]
    const db = NEDB.getDB(evmdb) //open or create db 
    let docs = await NEDB.getDocs(db,keys)
    return docs
}
EVM.getEvents = getEvents

function insertEvent(event){
    //const {...object} = event
    console.log(event)
    //return
    return new Promise((resolve,reject) =>{
        const db = NEDB.getDB(evmdb) //open or create db 
        db.insert(event, (err, newdoc)=>{
            if(err) reject(null)
            else resolve(newdoc)
        })
    })
}
EVM.insertEvent = insertEvent

export default EVM