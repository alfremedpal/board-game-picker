export const formatName = name => {
    if (name.slice(-1) === 's') {
        return `${name}'`
    }
    return `${name}'s`
}
