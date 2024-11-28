import Select, { components } from 'react-select'
import selectIcon from '../assets/svgSource/selectIcon.svg'
import { Black, lightGrey } from './colors'
import { scrollBar } from './commonStyles'

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={selectIcon} alt="dropdown" style={{ height: '7px' }} />
    </components.DropdownIndicator>
  )
}

const ValueContainer = ({ children, ...props }) => <components.ValueContainer {...props}>{children}</components.ValueContainer>

const CustomSelect = (props) => {
  const customStyles = props.customStyles || {}

  const colorStyles = {
    control: styles => ({
      ...styles,
      height: '30px',
      minHeight: '30px',
      alignItems: 'center',
      borderColor: lightGrey
    }),
    input: styles => ({
      ...styles,
      ...customStyles.input
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        color: Black,
        backgroundColor: isFocused || isSelected ? '#E6E6E6' : '#fff',
        ':active': {
          ...styles[':active'],
          backgroundColor: isSelected ? '#E6E6E6' : '#eee'
        },
        lineHeight: '30px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        fontSize: 18
      }
    },
    indicatorSeparator: styles => ({
      display: 'none'
    }),
    dropdownIndicator: styles => ({
      ...styles,
      ...customStyles.dropdownIndicator
    }),
    menuList: styles => ({
      ...styles,
      ...scrollBar
    }),
    singleValue: styles => ({
      ...styles,
      ...customStyles.singleValue
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      ...customStyles.valueContainer
    })
  }

  return (
    <div style={{ width: props.width ? props.width : 160, height: '30px' }}>
      <Select
        defaultValue={props.ifChangeDefaultValue ? undefined : props.defaultValue}
        value={props.ifChangeDefaultValue ? props.defaultValue : undefined}
        label="Single select"
        options={props.getOptions ? props.getOptions() : props.options}
        onChange={props.onChange}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            neutral20: '#333333',
            primary: '#333333',
            primary25: '#333333'
          }
        })}
        components={{ DropdownIndicator, ValueContainer }}
        styles={colorStyles}
        menuPlacement='auto'
      />
    </div>
  )
}

export default CustomSelect