const valiadtion = (val, rules,connectValue) => {
    let isValid = true

    for (let rule in rules) {
        switch (rule) {
            case 'isEmial':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule])
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectValue[rule])
                break;
            default:
                isValid = true
        }

    }
    return isValid
}


const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
}

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength
}

const equalToValidator = (val, checkValue) => {

    return val === checkValue
}

export default valiadtion;