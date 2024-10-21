function addCategory(req, res, next) {
    const {name, icon} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    const iconValidation = validateIcon(icon);
    iconValidation.error
    ? errorMsg['icon'] = iconValidation.error
    : req.data['icon'] = iconValidation.icon;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function editCategory(req, res, next) {
    const {name, icon, hidden} = req.body;
    const errorMsg = {};
    req.data = {};

    const nameValidation = validateName(name);
    nameValidation.error
    ? errorMsg['name'] = nameValidation.error
    : req.data['name'] = nameValidation.name;

    if (icon !== undefined) {
        const iconValidation = validateIcon(icon);
        iconValidation.error
        ? errorMsg['icon'] = iconValidation.error
        : req.data['icon'] = iconValidation.icon;
    }

    const hiddenValidation = validateHidden(hidden);
    hiddenValidation.error
    ? errorMsg['hidden'] = hiddenValidation.error
    : req.data['hidden'] = hiddenValidation.name;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function validateName(name) {
    if (!name) return {error: 'Name is required'};
    if (typeof(name) !== 'string') return {error: 'Name must be string'};

    name = name.trim().replace(/\s+/g, ' ');

    if (!name) return {error: 'Name is required'};
    if (name.length > 30) return {error: 'Name length exceeds 50 characters'};

    return {name};
}

function validateIcon(icon) {
    if (!icon) return {error: 'Icon is required'};
    if (!/^data:image\/(png|jpg|jpeg);base64,/.test(icon)) return {error: 'Icon must be a valid image in PNG, JPG, or JPEG format'};

    return {icon};
}

function validateHidden(hidden) {
    if (hidden === undefined) return {error: 'Hidden is required'};
    if (typeof(hidden) !== 'boolean') return {error: 'Hidden must be boolean'};
    return {hidden};
}

module.exports = {addCategory, editCategory};