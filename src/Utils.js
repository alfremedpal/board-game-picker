export const formatName = name => {
    if (name.slice(-1) === 's') {
        return `${name}'`
    }
    return `${name}'s`
}

export const filterPlayerCount = (collection, min, max) => {
    let filteredCollection = collection
    if (min !== null && min !== 'any') {
        filteredCollection = filteredCollection.filter(game => {
            return Number(game.stats['@_minplayers']) >= Number(min)
        })
    }

    if (max !== null && max !== 'any') {
        filteredCollection = filteredCollection.filter(game => {
            return Number(game.stats['@_maxplayers']) <= Number(max)
        })
    }

    return filteredCollection
}
