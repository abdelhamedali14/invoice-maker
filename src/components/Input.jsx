
import {
    Field,
    ErrorMessage,
} from 'formik'
import { TextError } from './TextError'


export const Input = (props) => {
    const { label, name,type, ...rest } = props
    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name}  type={type} {...rest} />
            <ErrorMessage component={TextError} name ={name} />
        </div>
    )
}
