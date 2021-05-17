import React from 'react'

import { Box, Heading, Link, Text } from '@chakra-ui/layout'
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { BsGearFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'

export default function Future() {

    return(
        <Box className="main">
            <Heading>
                What's next
            </Heading>
            <Text>
                This website is currently under continous development adding new features. Here are some of the things I'm
                either currently working on or planning to implement in the near future.
                Remember that you can always&nbsp;
                <Link color="teal.500" href="https://github.com/alfremedpal/board-game-picker" isExternal>
                    contribute to the project
                </Link> or&nbsp;
                <Link color="teal.500" href="/support">
                    support me with a donation
                </Link>.
            </Text>
            <List spacing={3} textAlign="left">
                <ListItem>
                    <ListIcon as={FaCheck} color="teal.500" />
                    Ranking engine <b>import feature</b>
                </ListItem>
                <ListItem>
                    <ListIcon as={FaCheck} color="teal.500" />
                    Ranking engine <b>export feature</b>
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Add some meta data to exported collections for more user customization
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Filter through specific tiers in the ranking table
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Add 'take a screenshot' option or something
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Add option to the ranking table to have all games in sight without scrolling horizontally
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Save collections locally so they can be imported too
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Ranking engine vertical layout option
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    Add more game data to the ranking step
                </ListItem>
                <ListItem>
                    <ListIcon as={BsGearFill} color="teal.500" />
                    User login to save custom lists
                </ListItem>
            </List>
        </Box>
    )
}