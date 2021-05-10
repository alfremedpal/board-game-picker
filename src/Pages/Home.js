import React from 'react'
import { 
    Heading,
    LinkBox,
    LinkOverlay,
    Text
 } from '@chakra-ui/react'

export default function Home() {

    return (
        <div style={{padding:'2%'}}>
            <Heading as="h1">
                Board Game Picker
            </Heading>

            <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md" textAlign="left" style={{marginTop:'5%'}}>
                <Heading size="md" my="2" color="teal.500">
                    <LinkOverlay href="/game-picker">
                        Game Picker
                    </LinkOverlay>
                </Heading>
                <Text>
                    Get a random game from your BGG collection to play!
                    Apply several filters to your liking.
                </Text>
            </LinkBox>

            <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md" textAlign="left" style={{marginTop:'5%'}}>
                <Heading size="md" my="2" color="teal.500">
                    <LinkOverlay href="/ranking-engine">
                        Ranking Engine
                    </LinkOverlay>
                </Heading>
                <Text>
                    Rank your BGG collection in this tier-based engine. Coming soon.
                </Text>
            </LinkBox>
        </div>
    )
}