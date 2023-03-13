import {  DatePicker } from "./DatePicker"
import { Input } from "./Input"
import { Select } from "./Select"



export const FormControl = ( props ) => {
    const {control,...rest}= props
    //switch case to detect the type of input 
    switch (control) {
        case "input":return <Input {...rest}/>
        case "option": return <Select {...rest}/>
        case "date": return <DatePicker {...rest}/> 
        default: return null
    }
  

 
}
