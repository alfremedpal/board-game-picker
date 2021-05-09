import React, { useState } from 'react'
import { Route } from 'react-router'
import { Text, Link } from '@chakra-ui/core'

import Home from './Pages/Home'
import Picker from './Pages/Picker'
import Modal from './Components/Modal'

import './App.css'
import './pattern.css'

function App() {

	const [modalOpen, setModalOpen] = useState(false)


	return (
		<div className="App">
			<Route exact path="/" component={Home}/>
			<Route exact path="/picker" component={Picker}/>
			<footer>
                <Text color="gray.500" fontSize="sm">
                    <Link href="https://www.buymeacoffee.com/amedpal" isExternal>Buy me a coffee</Link> | &nbsp;
                    <Link href="https://github.com/alfremedpal/board-game-picker" isExternal>Source code</Link> | &nbsp;
                    <Link onClick={() => setModalOpen(true)}>About and Contact</Link>
                </Text>
                <Text color="gray.500" fontSize="sm">
                    All data gathered possible to the official BGG API.
                </Text>
                <small style={{fontSize:'0.5em', color:'#CBD5E0'}}>
                    Ver. 0.1.0
                </small>
            </footer>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
		</div>
	)
}

export default App;
