const validator = (validations, value) => {
    let isValid = true;
    for (var i = 0; i < validations.length; i++) {
        const rule = validations[i].rule;
        const message = validations[i].message;
        isValid &= runRule(rule.type, rule.pattern, value);
    }
    return isValid;
};

const runRule = (rule, pattern, value) => {
    let isValid = true;
    switch (rule) {
        case "required":
            isValid &= pattern && value !== null && value !== undefined;
            break;
        case "regex":
            const re = new RegExp(pattern);
            isValid &= re.test(value);
            break;
        case "gt":
            isValid &= value > pattern;
            break;
        case "gte":
            isValid &= value >= pattern;
            break;
        default:
            isValid = false;
            break;
    }
    return isValid;
};

export default validator;
