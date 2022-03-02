/*
    * @param {*} event
    * @param {*} selectName the affected select name (this select will be reset)
    * @param {*} selectStateValue the affected select's previous value (this value will be reset)
    * @param {*} resetTriggerRadioRadioName name attribute of reset triggering radio
    * @param {*} resetTriggerRadioValue value attribute of reset triggering radio
    */
export const resetSelectOnRadio = (
    event,
    selectName,
    selectStateValue,
    resetTriggerRadioRadioName,
    resetTriggerRadioValue) => {

    const {
        name,
        value
    } = event.target

    // try to get select's value v1
    // as a default, set the current state value for the select
    // (maybe we won't need to reset)
    // set null if state value unavailable
    let selectToChange = selectStateValue || null

    // try to get select's value v2
    // the event is triggered for this given select, set new value for the select
    if (name === selectName)
        selectToChange = value

    // reset
    // the event is triggered for the resetter radio, perform reset
    if (name === resetTriggerRadioRadioName &&
        value === resetTriggerRadioValue)
        selectToChange = null

    return selectToChange
}
