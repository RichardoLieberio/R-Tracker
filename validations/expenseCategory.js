function addCategory(req, res, next) {
    const {name, icon, color} = req.body;
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

    const colorValidation = validateColor(color);
    colorValidation.error
    ? errorMsg['color'] = colorValidation.error
    : req.data['color'] = colorValidation.color;

    if (Object.entries(errorMsg).length) return res.json({status: 422, msg: errorMsg});
    next();
}

function editCategory(req, res, next) {
    const {name, icon, color, hidden} = req.body;
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

    const colorValidation = validateColor(color);
    colorValidation.error
    ? errorMsg['color'] = colorValidation.error
    : req.data['color'] = colorValidation.color;

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
    if (!/^data:image\/(png|svg);base64,/.test(icon)) return {error: 'Icon must be a valid image in PNG or SVG format'};

    return {icon};
}

function validateColor(color) {
    if (!color) return {error: 'Color is required'};
    if (typeof(color) !== 'string') return {error: 'Color must be string'};

    color = color.trim();

    if (!color) return {error: 'Color is required'};

    const hexColorPattern = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    if (!hexColorPattern.test(color)) return {error: 'Invalid hex color'};

    return {color};
}

function validateHidden(hidden) {
    if (hidden === undefined) return {error: 'Hidden is required'};
    if (typeof(hidden) !== 'boolean') return {error: 'Hidden must be boolean'};
    return {hidden};
}

module.exports = {addCategory, editCategory};