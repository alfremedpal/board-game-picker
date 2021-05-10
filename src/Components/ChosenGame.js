import React from 'react'
import { GiMeeple } from 'react-icons/gi'
import { BsClock } from 'react-icons/bs'
import { 
    Box,
    Image,
    Text,
    Icon,
    Heading,
    Link 
} from '@chakra-ui/react'

export default function ChosenGame(props) {

    const game = {
        name: props.game.name['#text'],
        image: props.game.image,
        minPlayers: props.game.stats['@_minplayers'],
        maxPlayers: props.game.stats['@_maxplayers'],
        bggRating: props.game.stats.rating.average['@_value'],
        id: props.game['@_objectid']
    }

    const formatPlayerCount = (min, max) => {
        if (min === max) {
            return min
        }

        return `${min} - ${max}`
    }

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={game.image} alt={game.name} />
            <Box p="6">
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    <Heading color="gray.500">{game.name}</Heading>
                </Box>
                <Text>
                    <Icon color="#319795" as={GiMeeple}/> {formatPlayerCount(game.minPlayers, game.maxPlayers)}
                    &nbsp;
                    <Icon color="#319795" as={BsClock}/> {props.game.stats['@_playingtime']}
                    <br />
                    <b style={{color:'#319795'}}>BGG rating:</b> {game.bggRating}
                    <br />
                    <Link 
                        href={`https://boardgamegeek.com/boardgame/${game.id}`} 
                        isExternal 
                        color="gray.500"
                    >
                        View on BGG
                    </Link>
                </Text>
            </Box>
        </Box>
    )
}