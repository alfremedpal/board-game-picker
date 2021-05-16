import React, { useState, useContext } from 'react'
import { Box, Flex, Image, Select, Text } from '@chakra-ui/react'

import { TieredCollectionContext } from './CollectionContext'

export default function RankableGame(props) {

    const {tieredCollection, setTieredCollection} = useContext(TieredCollectionContext)
    const game = props.game

    const [tier, setTier] = useState()
    const tierBackground = {
        S: 'red.200',
        A: 'orange.200',
        B: 'yellow.200',
        C: 'green.200',
        D: 'teal.200',
        E: 'cyan.200',
        F: 'blue.200',
    }

    const changeTier = (tier) => {
        const newGame = {
            name: game.name['#text'],
            thumbnail: game.thumbnail,
            tier: tier
        }

        setTier(tier)
        if (tier === 'N') {
            setTieredCollection(
                tieredCollection.filter(g => g.name !== game.name['#text'])
            )
        } else {
            setTieredCollection(
                [
                    ...tieredCollection.filter(g => g.name !== game.name['#text']),
                    newGame
                ]
            )
        }
    }

    return(
        <Box borderWidth="1px" borderRadius="lg" p={4} margin="2% 0" bgColor={tierBackground[tier]}>
            <Flex direction="row" alignItems="center" justifyContent="flex-start">
                <Image boxSize="75px" src={game.thumbnail} alt={game.name['#text']}/>
                <Box p={4} maxW="70%">
                    <Text isTruncated fontSize="sm">
                        {game.name['#text']}
                    </Text>
                </Box>
            </Flex>
            <Select 
                onChange={(e) => changeTier(e.target.value)}
                margin="2% 0"
            >
                    <option value="N">Do not include</option>
                    <option value="S">S Tier</option>
                    <option value="A">A Tier</option>
                    <option value="B">B Tier</option>
                    <option value="C">C Tier</option>
                    <option value="D">D Tier</option>
                    <option value="E">E Tier</option>
                    <option value="F">F Tier</option>
                </Select>
        </Box>
    )
}