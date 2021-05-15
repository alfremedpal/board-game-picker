import React from 'react'

import { Box, Heading, Text, Link } from '@chakra-ui/layout'
import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'

export default function Support() {

    return (
        <Box className="main">
            <Heading>
                Support me
            </Heading>
            <Text>
                Thank you for considering supporting me!
            </Text>
            <List spacing={3} textAlign="left" marginTop="2%">
                <ListItem>
                    <ListIcon as={BsHeartFill} color="teal.500" />
                    <Link 
                        href="https://www.buymeacoffee.com/amedpal" 
                        isExternal
                        color="teal.500"
                    >
                        Buy me a coffee
                    </Link>
                </ListItem>
                <ListItem>
                    <ListIcon as={BsHeartFill} color="teal.500" />
                    <Link 
                        href="https://www.paypal.com/donate?hosted_button_id=RWGMLSMQY6QCY" 
                        isExternal
                        color="teal.500"
                    >
                        Donate through PayPal
                    </Link>
                </ListItem>
                <ListItem>
                    <ListIcon as={BsHeartFill} color="teal.500" />
                    <b>BTC address</b>: 3FgEkYCYw9sH7L5cCuipG7R4ZmHGKzt4sn
                </ListItem>
                <ListItem>
                    <ListIcon as={BsHeartFill} color="teal.500" />
                    <b>ETH address</b>: 0x42aa52106815fc79472c7f6ba98417c9a60eec17
                </ListItem>
            </List>
        </Box>
    )
}