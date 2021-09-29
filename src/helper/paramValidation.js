const filter_param = (roles, value) => {

    const allowed_field = new Set(roles);

    return is_exist(allowed_field, value)
};

const is_exist = (type, value) => {

    return type.has(value);

};

module.exports = filter_param;