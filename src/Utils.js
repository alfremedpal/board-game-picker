export const formatName = name => {
    if (name.slice(-1) === 's') {
        return `${name}'`
    }
    return `${name}'s`
}

export const filterPlayerCount = (collection, numPlayers, minPlayers, maxPlayers) => {
    return collection.filter(game => {
        if (minPlayers !== null && minPlayers !== 'any') {
            if (Number(game.stats['@_minplayers']) < Number(minPlayers)) {
                return false;
            }
        }

        if (maxPlayers !== null && maxPlayers !== 'any') {
            if (Number(game.stats['@_maxplayers']) > Number(maxPlayers)) {
                return false;
            }
        }

        if (numPlayers !== null && numPlayers !== 'any') {
            if (Number(game.stats['@_minplayers']) > Number(numPlayers) ||
                Number(game.stats['@_maxplayers']) < Number(numPlayers)) {
                return false;
            }
        }

        return true;
    })
}
