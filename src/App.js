import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parser from 'fast-xml-parser'
import { MdInfo } from 'react-icons/md'
import { FaDice } from 'react-icons/fa'
import { 
	Box, 
	Input, 
	Button, 
	Collapse, 
	Heading, 
	AccordionIcon, 
	AccordionButton, 
	AccordionItem, 
	Accordion, 
	AccordionPanel,
	Checkbox,
	Tooltip,
	useToast,
	Icon,
	Select,
	Text,
	Link,
} from '@chakra-ui/core'

import Modal from './Components/Modal'
import ChosenGame from './Components/ChosenGame'
import Game from './Components/Game'
import Shape from './Components/Shapes'

import './App.css';
import './pattern.css'

function App() {

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
	const [rating, setRating] = useState(null)
	const [minBGGRating, setMinBGGRating] = useState(null)
	const [rated, setRated] = useState(false)
	const [played, setPlayed] = useState(false)
	const [comment, setComment] = useState(false)
	const [hideExpansions, setHideExpansions] = useState(false)

	const [activeCollection, setActivecollection] = useState([])
	const [chosenGame, setChosenGame] = useState()

	const toast = useToast()
	const [loading, setLoading] = useState(false)
	const [collectionVisible, setCollectionVisible] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		chooseRandomeGame()
	}, [activeCollection])

	const successHandler = (res) => {
		const parsedCollection = parser.parse(res.data, {ignoreAttributes : false})
		console.log('parsed=>', parsedCollection)
		if (parsedCollection.items.item === undefined) {
			setActivecollection([])
			toast.closeAll()
			toast({
				title: "No games matched your criteria",
				description: "Try adjusting your filters",
				status: "error",
				duration: 5000,
				isClosable: true,
			})
			setLoading(false)
		} else {
			console.log('type=>', Array.isArray(parsedCollection.items.item))
			if (Array.isArray(parsedCollection.items.item)) {
				setActivecollection(parsedCollection.items.item)
			} else {
				setActivecollection([parsedCollection.items.item])
			}
			setActiveUsername(username)
			setLoading(false)
			toast.closeAll()
			toast({
				title: "Collection fetched!",
				description: "Collection successfully downloaded",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		}
	}

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

	const requestCollection = () => {
		setLoading(true)
		axios.get('https://www.boardgamegeek.com/xmlapi2/collection', {
			params: {
				username: username,
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
		}).then(successHandler).catch(errorHandler)
	}

	const chooseRandomeGame = () => {
		const game = activeCollection[Math.floor(Math.random() * activeCollection.length)]
		setChosenGame(game)
	}

	const formatName = name => {
		if (name.slice(-1) === 's') {
			return `${name}'`
		}

		return `${name}'s`
	}

	return (
		<div className="App">
			<div className="main">
				<h1 className="title">
					<Heading>
						Board Game Picker
					</Heading>
				</h1>
				<Text color="gray.500" align="left">
					Enter your BGG username and get a random game from your collection <b>marked as owned</b> to play. 
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
									<Tooltip label="Only games that have been rated" aria-label="Rated filter tooltip">
										<span><MdInfo/></span>
									</Tooltip>
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
									<Tooltip label="Only games with at least one play recorded" aria-label="Played filter tooltip">
										<span><MdInfo/></span>
									</Tooltip>
								</div>
								<div className="checkbox-group">
									<Checkbox 
										isChecked={comment} 
										onChange={() => setComment(!comment)} 
										size="lg"
										colorScheme="teal"
									>
										Comment
									</Checkbox>
									<Tooltip label="Only games that have been commented on" aria-label="Comment filter tooltip">
										<span><MdInfo/></span>
									</Tooltip>
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
						Roll <Icon as={FaDice}/>
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

				<div className="toggle-area"
					onClick={() => setCollectionVisible(!collectionVisible)}
				>
					<h2 
						className="subtitle"
					>
						{
							activeCollection === undefined || activeCollection.length === 0 ? 
							'No collection loaded': 
							`${formatName(activeUsername)} collection (${activeCollection.length})`
							
						}
					</h2>
				</div>
				
				<Collapse isOpen={collectionVisible}>
					{
						activeCollection === undefined || activeCollection === 0 ? 
						<></> :
						activeCollection.map(game => (
							<Game key={game.name} game={game}/>
						))
					}
				</Collapse>
				<footer>
					<Text color="gray.500" fontSize="sm">
						<Link href="https://www.buymeacoffee.com/amedpal" isExternal>Buy me a coffee</Link> | &nbsp;
						<Link>Source code</Link> | &nbsp;
						<Link onClick={() => setModalOpen(true)}>About and Contact</Link>
					</Text>
					<Text color="gray.500" fontSize="sm">
						All data gathered possible to the official BGG API.
					</Text>
				</footer>
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
			</div>
				<Shape type="triangle"/>
				<Shape type="square"/>
				<Shape type="circle"/>
		</div>
	)
}

export default App;
