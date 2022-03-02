const SelectLanguage = (props) => {
    return (<button onClick={e => props.handleLanguage("en")}>Click me!</button>)
}

export default SelectLanguage