import React  from 'react'
import { Route } from 'react-router'
import { 
    useDisclosure,
    Text, 
    Link
} from '@chakra-ui/react'

import Home from './Pages/Home'
import Picker from './Pages/Picker'
import Modal from './Components/BGModal'
import Ranking from './Pages/Ranking'
import Future from './Pages/Future'
import Support from './Pages/Support'

import './App.css'
import './pattern.css'

function App() {

    const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<div className="App">

			<Route exact path="/" component={Home}/>
			<Route exact path="/game-picker" component={Picker}/>
            <Route exact path="/ranking-engine" component={Ranking}/>
            <Route exact path="/whats-coming" component={Future}/>
            <Route exact path="/support" component={Support}/>

			<footer>
                <Text color="gray.500" fontSize="sm">
                    <Link href="/" >Home</Link>
                </Text>
                <Text color="gray.500" fontSize="sm">
                    <Link href="https://github.com/alfremedpal/board-game-picker" isExternal>Source code</Link> | &nbsp;
                    <Link href="/support">Support me</Link> | &nbsp;
                    <Link href="/whats-coming" >Coming features</Link> | &nbsp;
                    <Link onClick={onOpen}>About</Link>
                </Text>
                <Text color="gray.500" fontSize="sm">
                    All data gathered possible to the official BGG API.
                </Text>
                <small style={{fontSize:'0.6em', color:'#CBD5E0'}}>
                    Ver. 0.4.0
                </small>
            </footer>
            <Modal isOpen={isOpen} onClose={onClose} />
		</div>
	)
}

export default App;
