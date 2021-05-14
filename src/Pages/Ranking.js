import React, { useState } from 'react'
import { Box, Heading, Button, ButtonGroup, Alert, AlertIcon, Link } from '@chakra-ui/react'

import Step1 from '../Components/RankingSteps/Step1'
import Step2 from '../Components/RankingSteps/Step2'

export default function Ranking() {

    const [collection, setCollection] = useState([])
    const collectionValue = {collection, setCollection}

    const [currentStep, setCurrentStep] = useState(1)
    const [canMoveOn, setCanMoveOn] = useState(false)

    const CollectionContext = React.createContext({
        collection: [],
        setCollection: () => {}
    })

    return (
        <Box className="main"> 

            <Heading>
                Ranking Engine
            </Heading>
            {currentStep === 1 ? 
                <CollectionContext.Provider value={collectionValue}>
                    <Step1 canMoveOn={(e) => setCanMoveOn(e)} passCollection={(col) => setCollection(col)}/> 
                </CollectionContext.Provider>
                : null
            }
            {currentStep === 2 ? <Step2 collection={collection}/> : null}

            <ButtonGroup variant="solid" spacing="6" style={{margin:'2% 0'}}>
                <Button
                    onClick={() => setCurrentStep(currentStep - 1)} 
                    colorScheme="teal"
                    size="md" 
                    width="100px"
                    disabled={currentStep===1}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => setCurrentStep(currentStep + 1)} 
                    colorScheme="teal"
                    size="md" 
                    width="100px"
                    disabled={!canMoveOn}
                >
                    Next
                </Button>
            </ButtonGroup>

            <Alert status="info">
                <AlertIcon />
                The ranking engine is still adding new features, but you can always&nbsp;
                <Link href="https://github.com/alfremedpal/board-game-picker" isExternal>
                    <b>contribute to the project</b>
                </Link>
            </Alert>
        </Box>
    )
}