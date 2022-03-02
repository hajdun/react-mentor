import { resetSelectOnRadio } from './formUtils';


const unaffectedSelectName = "select1"
const unaffectedSelectValue = "orange"

const affectedSelectName = "select2"
const affectedSelectPrevValue = "coconut"
const affectedSelectNextValue = "apple"

const radioNameCausingReset = "resetterRadio"
const radioValueCausingReset = "resetterValue"

const selectEventUnrelated = {
    target: {
        name: unaffectedSelectName,
        value: unaffectedSelectValue
    }
}

const selectEventRelated = {
    target: {
        name: affectedSelectName,
        value: affectedSelectNextValue
    }
}

const selectEventResetterRadio = {
    target: {
        name: radioNameCausingReset,
        value: radioValueCausingReset
    }
}

const badEvent = {
    target: {
        name: null,
        value: null
    }
}

// select value must stay the same
test('check function with unrelated change (no reset)', () => {

    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventUnrelated,
        affectedSelectName,
        affectedSelectPrevValue,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(affectedSelectPrevValue).toEqual(selectValueAfterResetCall);
});



test('check function with related change (select value changed, no reset)', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventRelated,
        affectedSelectName,
        affectedSelectPrevValue,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(affectedSelectNextValue);
});


test('check function with related change (radio value changed, reset select)', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventResetterRadio,
        affectedSelectName,
        affectedSelectPrevValue,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(null);
});


test('bad parameters, event', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        badEvent,
        affectedSelectName,
        affectedSelectPrevValue,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(affectedSelectPrevValue);
});

test('bad parameters, select name', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventResetterRadio,
        null,
        affectedSelectPrevValue,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(null);
});

test('bad parameters, select value', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventResetterRadio,
        affectedSelectName,
        null,
        radioNameCausingReset,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(null);
});

test('bad parameters, radio name', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventResetterRadio,
        affectedSelectName,
        affectedSelectPrevValue,
        null,
        radioValueCausingReset);

    expect(selectValueAfterResetCall).toEqual(affectedSelectPrevValue);
});

test('bad parameters, radio value', () => {
    const selectValueAfterResetCall = resetSelectOnRadio(
        selectEventResetterRadio,
        affectedSelectName,
        affectedSelectPrevValue,
        radioNameCausingReset,
        null);

    expect(selectValueAfterResetCall).toEqual(affectedSelectPrevValue);
});