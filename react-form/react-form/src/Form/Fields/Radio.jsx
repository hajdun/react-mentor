import React from 'react';

class Radio extends React.Component {

    render() {
        const { name, handleChange } = this.props

        return (
            <div>
                <h2>{name}</h2>

                <label htmlFor="v1">
                    <input
                        type="radio"
                        name={name}
                        id="v1"
                        value="v1"
                        onChange={handleChange}
                    />
                    Group setting 1
                </label>

                <label htmlFor="v2">
                    <input
                        type="radio"
                        name={name}
                        id="v2"
                        value="v2"
                        onChange={handleChange}
                    />
                    Group setting 2 (will cause reset)
                </label>
            </div>
        );
    }
}

export default Radio;