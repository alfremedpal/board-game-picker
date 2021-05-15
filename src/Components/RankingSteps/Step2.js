import React from 'react'
import {
    Box,
    Heading,
    Text
} from '@chakra-ui/react'

import RankableGame from '../RankableGame'

export default function Step2(props) {

    const collection = props.collection

    return (
        <Box>
            <Heading as="h3" size="lg">Step 2: Rank your collection</Heading>
            <Text color="gray.500" align="left">
                Rank your game collection, from S tier (better) to F tier (worst). 
                You can also set some of your games to not be included in the final list.
            </Text>
            {
                collection === undefined || collection === 0 ? 
                <></> :
                collection.map(game => (
                    <RankableGame
                        key={game.name['#text']} 
                        game={game}
                    />
                ))
            }
        </Box>
    )
}