import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import parser from 'fast-xml-parser'
import { FaDice } from 'react-icons/fa'
import { 
	Box, 
	Input, 
	Button, 
	Heading, 
	AccordionIcon, 
	AccordionButton, 
	AccordionItem, 
	Accordion, 
	AccordionPanel,
	Checkbox,
	useToast,
	Icon,
	Select,
	Text,
} from '@chakra-ui/react'

import ChosenGame from '../Components/ChosenGame'
import Game from '../Components/Game'
import { formatName, filterPlayerCount } from '../Utils'

export default function Picker() {

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

	const [username, setUsername] = useState('')
	const [activeUsername, setActiveUsername] = useState('')

	const [minRating, setMinRating] = useState(null)
	const [rating, setRating] = useState(null) // Max. Rating
	const [minBGGRating, setMinBGGRating] = useState(null)
	const [numPlayers, setNumPlayers] = useState(null)
	const [minPlayerCount, setMinPlayerCount] = useState(null)
	const [maxPlayerCount, setMaxPlayerCount] = useState(null)
	const [rated, setRated] = useState(false)
	const [played, setPlayed] = useState(false)
	const [comment, setComment] = useState(false)
	const [hideExpansions, setHideExpansions] = useState(false)

	const [activeCollection, setActivecollection] = useState([])
	const [chosenGame, setChosenGame] = useState()

	const toast = useToast()
	const [loading, setLoading] = useState(false)

	const chooseRandomeGame = useCallback(() => {
		const game = activeCollection[Math.floor(Math.random() * activeCollection.length)]
		setChosenGame(game)
	}, [activeCollection])

	useEffect(() => {
		chooseRandomeGame()
	}, [activeCollection, chooseRandomeGame])

    // Success handler - Collection downloaded
    const successHandler = (responses) => {
        let multiCollection = [];
        for (var i = 0; i < responses.length; i++) {
            let res = responses[i];
            let parsedCollection = parser.parse(res.data, {ignoreAttributes : false})
            // console.log('parsed=>', parsedCollection)
            if (parsedCollection.items.item === undefined) {
                // Collection is empty
                console.log('No games found matching criteria...');
            } else {
                // Collection has games
                // console.log('type=>', Array.isArray(parsedCollection.items.item))
                if (Array.isArray(parsedCollection.items.item)) {
                    parsedCollection = parsedCollection.items.item
                } else {
                    parsedCollection = [parsedCollection.items.item]
                }
                multiCollection.push(...parsedCollection)
            }
        }
        setActivecollection(filterPlayerCount(multiCollection, numPlayers, minPlayerCount, maxPlayerCount));
        setActiveUsername(username);
        setLoading(false);
        if (multiCollection.length >= 0) {
            toast.closeAll()
            toast({
                title: "Collection fetched!",
                description: "Collection successfully downloaded",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "No games matched your criteria",
                description: "Try adjusting your filters",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }

	// Error handler - collection either took too long to be downloaded or username does no exists
	const errorHandler = (err) => {
		console.log(err.response)
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

    // Actual request to download collection
    const requestCollection = () => {
        setActivecollection([])
        setLoading(true)
        let user_names = [];
        if (username.includes(',')) {
            user_names = username.split(',');
        } else {
            user_names.push(username)
        }
        console.log(user_names);
        let promises = [];
        for (var i = 0; i < user_names.length; i++) {
            var user_name = user_names[i];
            promises.push(axios.get('https://www.boardgamegeek.com/xmlapi2/collection', {
                params: {
                    username: user_name,
                    stats: 1,
                    own: 1,
                    minrating: minRating === 'any' ? null : minRating,
                    rating: rating === 'any' ? null : rating,
                    minbggrating: minBGGRating === 'any' ? null : minBGGRating,
                    rated: rated ? 1 : null,
                    played: played ? 1 : null,
                    comment: comment ? 1 : null,
                    excludesubtype: hideExpansions ? 'boardgameexpansion' : null
                }
            }))
        }

        Promise.all(promises).then(successHandler).catch(errorHandler)
    }

    return (
        <div className="main">
            <Heading>
                Game Picker
            </Heading>
            <Text color="gray.500" align="left">
                Enter your BGG username (or comma-separated list of usernames) and get a random game from your collection <b>marked as owned</b> to play. 
                Use the filters under the 'Advanced' menu to refine your collection to your liking. 
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
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" style={{color:'#718096'}}>
                            Advanced
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={10}>
                        <div className="stack">
                            <small>Min. personal rating</small>
                            <Select onChange={(e) => setMinRating(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <small>Max. personal rating</small>
                            <Select onChange={(e) => setRating(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <small>Min. BGG rating</small>
                            <Select onChange={(e) => setMinBGGRating(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <small>Num. players</small>
                            <Select onChange={(e) => setNumPlayers(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <small>Min. player count</small>
                            <Select onChange={(e) => setMinPlayerCount(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <small>Max. player count</small>
                            <Select onChange={(e) => setMaxPlayerCount(e.target.value)}>
                                <option value="any">Any</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </Select>
                            <div className="checkbox-group">
                                <Checkbox 
                                    isChecked={hideExpansions} 
                                    onChange={() => setHideExpansions(!hideExpansions)} 
                                    size="lg"
                                    colorScheme="teal"
                                >
                                    Hide expansions
                                </Checkbox>
                            </div>
                            <div className="checkbox-group">
                                <Checkbox 
                                    isChecked={rated} 
                                    onChange={() => setRated(!rated)} 
                                    size="lg"
                                    colorScheme="teal"
                                >
                                    Rated
                                </Checkbox>
                            </div>
                            <div className="checkbox-group">
                                <Checkbox 
                                    isChecked={played} 
                                    onChange={() => setPlayed(!played)} 
                                    size="lg"
                                    colorScheme="teal"
                                >
                                    Played
                                </Checkbox>
                            </div>
                            <div className="checkbox-group">
                                <Checkbox 
                                    isChecked={comment} 
                                    onChange={() => setComment(!comment)} 
                                    size="lg"
                                    colorScheme="teal"
                                >
                                    Commented
                                </Checkbox>
                            </div>
                        </div>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Button
                isDisabled={(!username.length > 0)}
                colorScheme="teal"
                variant={activeCollection.length > 0 ? 'outline' : 'solid'} 
                onClick={() => {
                    toast({
                        title: "Fetching your collection",
                        description: "This might take a couple of seconds if your collection is big",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                    })
                    requestCollection()
                }}
                isLoading={loading}
                style={{margin: '10px 0 10px 0', width:'100%'}}
            >
                {
                    activeCollection.length > 0 
                    ? <>Update collection and roll &nbsp; <Icon as={FaDice}/></> 
                    : <>Get collection and roll &nbsp; <Icon as={FaDice}/></> 
                }
            </Button>
            {
                activeCollection.length > 0 ?
                <Button
                    colorScheme="teal"
                    onClick={chooseRandomeGame}
                    isLoading={loading}
                    style={{margin: '10px 0 10px 0', width:'100%'}}
                >
                    Roll &nbsp; <Icon as={FaDice}/>
                </Button>
            : null
            }

            {
                chosenGame ?
                <div className="chosen-game">
                    <ChosenGame game={chosenGame}/>
                </div>
                : null
            }

            <Accordion allowToggle style={{marginTop:'2%'}}>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left" style={{color:'#718096'}}>
                        {
                            activeCollection === undefined || activeCollection.length === 0 ? 
                            'No collection loaded': 
                            `${formatName(activeUsername)} collection (${activeCollection.length})`
                        }
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {
                            activeCollection === undefined || activeCollection === 0 ? 
                            <></> :
                            activeCollection.map(game => (
                                <Game key={game.name['#text']} game={game}/>
                            ))
                        }
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
