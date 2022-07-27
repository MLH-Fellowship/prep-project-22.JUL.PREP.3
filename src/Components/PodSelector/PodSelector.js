import Select from 'react-select'
import { membersLocation } from '../../utils/membersData';
const PodSelector = (props) =>{
    const {filterInput,onChange}=props

    const style={
        option:(provided,state)=>({
            ...provided,
            color: state.isSelected? 'white' : 'black',
            "&:hover":{
                backgroundColor:"#133667",
                color:"white"
            }
        }),
        control:(provided,state)=>({
            ...provided,
            padding:"10px",
        })
    }
    return(
        <Select
        isSearchable
        placeholder={"Select pod's member location"}
        styles={style}
        onChange={onChange}
        value={filterInput}
        options={membersLocation}>
        </Select>
    )
}

export default PodSelector;