import React, { useState, useContext } from 'react'
import parser from 'fast-xml-parser'
import axios from 'axios'
import {
    Box,
    Heading,
    Text,
    Input,
    Button,
    HStack,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    AccordionIcon,
    useToast
} from '@chakra-ui/react'

import collectionContext from '../../Pages/Ranking'
import Game from '../Game'
import { formatName } from '../../Utils'

export default function Step1(props) {

    // const {collection, setCollection} = useContext(collectionContext)

    const [username, setUsername] = useState('')
    const [collection, setCollection] = useState([])
    const [loading, setLoading] = useState(false)

    const [hideExpansions, setHideExpansions] = useState(false)
    // const [includePrevOwned, setIncludePrevOwned] = useState(false)

    const toast = useToast()

    const MAX_RETRY = 5;
	let currentRetry = 1;
	axios.interceptors.response.use(function (response) {
		if (response.data.status === 202) {
			throw new axios.Cancel('Waiting for collection');
		} else {
		  return response;
		}
	  }, function (error) {
		return Promise.reject(error);
	})

    const successHandler = (res) => {
        console.log('RES ->', res)
        let parsedCollection = parser.parse(res.data, {ignoreAttributes : false})
        if (parsedCollection.items.item === undefined) {
			setCollection([])
			toast.closeAll()
			toast({
				title: "No games matched your criteria",
				description: "Try adjusting your filters",
				status: "error",
				duration: 5000,
				isClosable: true,
			})
			setLoading(false)
		// Collection has games
		} else {
			// console.log('type=>', Array.isArray(parsedCollection.items.item))
			if (Array.isArray(parsedCollection.items.item)) {
				parsedCollection = parsedCollection.items.item
			} else {
				parsedCollection = [parsedCollection.items.item]
			}
			setCollection(parsedCollection)
			setLoading(false)
            props.canMoveOn(true)
            props.passCollection(parsedCollection)
			toast.closeAll()
			toast({
				title: "Collection fetched!",
				description: "Collection successfully downloaded",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
            console.log(parsedCollection)
		}
	}

	const errorHandler = (err) => {
		console.log(err.response)
        console.log('ERR ->', err)
		if (currentRetry < MAX_RETRY) {
			currentRetry++;
			console.log('Retrying...');
			setTimeout(requestCollection, 1000 * currentRetry)
		} else {
			setLoading(false)
			toast({
				title: "Not found or took too long",
				description: "Either the username does not exists, or BGG took too long to generate your collection, try again",
				status: "warning",
				duration: 9000,
				isClosable: true,
			})
			console.log('Retried several times but still failed');
		}
	}

	const requestCollection = () => {
		setLoading(true)
		axios.get('https://www.boardgamegeek.com/xmlapi2/collection', {
			params: {
				username: username,
                stats: 1,
				own: 1,
                // prevowned: includePrevOwned ? 1 : null,
                excludesubtype: hideExpansions ? 'boardgameexpansion' : null
            }
		}).then(successHandler).catch(errorHandler)
        // if (includePrevOwned) {
            // TODO: Investigate why the BGG API responds with an empty collection
            // when filtering by your previously owned games AND your owned games the same time
        // }
	}

    return (
        <Box>
            <Heading as="h3" size="lg">Step 1: Load your collection</Heading>
            <Text color="gray.500" align="left">
                Enter your BGG username and load your collection. By default only games
                <b> marked as own</b> will be fetched, but you can adjust your settings under
                the 'Advanced' menu.
            </Text>

            <Input
                onChange={(e) => setUsername(e.target.value)}
                className="form"
                placeholder="BGG username"
                size="lg"
                style={{
                    margin: '10px 0 10px 0',
                    color: '#718096',
                    fontFamily: 'system-ui, sans-serif',
                    zIndex: '1'
                }}
            />

            <Accordion allowToggle style={{marginBottom:'10px'}}>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" style={{color:'#718096'}}>
                            Advanced
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={10}>
                        <HStack>
                            <Checkbox 
                                value={hideExpansions}
                                onChange={() => setHideExpansions(!hideExpansions)}
                                colorScheme="teal">Exclude expansions
                            </Checkbox>
                            {/* <Checkbox 
                                value={includePrevOwned}
                                onChange={() => setIncludePrevOwned(!includePrevOwned)}
                                colorScheme="teal">Include previously owned
                            </Checkbox> */}
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Button
                colorScheme="teal"
                variant="outline"
                isLoading={loading}
                onClick={requestCollection}
                isDisabled={(!username.length > 0)}
                w="100%"
            >
                Fetch collection
            </Button>

            <Accordion allowToggle style={{marginTop:'10px'}}>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" style={{color:'#718096'}}>
                        {
                            collection === undefined || collection.length === 0 ? 
                            'No collection loaded': 
                            `${formatName(username)} collection (${collection.length})`
                        }
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {
                            collection === undefined || collection === 0 ? 
                            <></> :
                            collection.map(game => (
                                <Game key={game.name['#text']} game={game}/>
                            ))
                        }
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
    )
}