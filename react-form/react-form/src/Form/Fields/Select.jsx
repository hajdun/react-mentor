import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [
                { label: "grapefruit", value: "Grapefruit" },
                { label: "lime", value: "Lime" },
                { label: "coconut", value: "Coconut" },
                { label: "mango", value: "Mango" },
            ]
        }
    }


    render() {
        const { values } = this.state
        const { name, handleChange, selectedValue } = this.props

        const defaultValueToShow = values[0].value

        return (
            <>
                <h2>{name}</h2>

                <select
                    name={name}
                    value={selectedValue || defaultValueToShow}
                    onChange={handleChange}>
                    {values.map(({ value, label }) => {

                        const key = `${value}_${label}`

                        return (
                            <option
                                key={key}
                                value={value}>
                                {label}
                            </option>)
                    })}
                </select>
            </>
        );
    }
}

export default Select;