
interface IProps {
    placeholder:string
    value:string
    onChange:(evt:any) => void
    type:string
    name:string
    label:string
}

export default function TextInput(props:IProps) {

    const { placeholder, value, onChange, type, name, label} = props

    return(
        <div className="input-group">
            <label>{label}</label>
            <input placeholder={placeholder} required value={value} onChange={onChange} type={type} name={name} />
        </div>
    )
}