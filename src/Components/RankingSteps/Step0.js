import React, { useState, useContext } from 'react'
import { Box, Heading, Text, Textarea, Button, Alert, AlertIcon } from '@chakra-ui/react'

import { TieredCollectionContext } from '../CollectionContext'


export default function Step0(props) {

    const [importData, setImportData] = useState("")
    const {tieredCollection, setTieredCollection} = useContext(TieredCollectionContext)

    const importTieredCollection = () => {
        setTieredCollection(JSON.parse(importData))
        props.importCollection()
    }

    return (
        <Box>
            <Heading as="h3" size="lg">
                Import tiered collection
            </Heading>
            <Text>
                Paste your previously exported tiered collection here to see it again!
            </Text>
            <Textarea
                placeholder="Paste here..."
                onChange={(e) => setImportData(e.target.value)}
                value={importData}
                margin="2% 0"
            />
            <Button
                onClick={importTieredCollection}
                colorScheme="teal"
                variant="outline"
                isDisabled={(!importData.length > 0)}
                w="100%"
            >
                Import tiered collection
            </Button>
            <Alert status="warning" fontSize="sm" marginTop="2%">
                <AlertIcon />
                Invalid import data will render a blank screen. Reload page to try again.
            </Alert>
        </Box>
    )
}