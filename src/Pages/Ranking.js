import React, { useState } from 'react'
import { Box, Heading, Button, ButtonGroup, Alert, AlertIcon, Link } from '@chakra-ui/react'

import { CollectionContext, TieredCollectionContext } from '../Components/CollectionContext'
import Step1 from '../Components/RankingSteps/Step1'
import Step2 from '../Components/RankingSteps/Step2'
import Step3 from '../Components/RankingSteps/Step3'

export default function Ranking() {

    const [collection, setCollection] = useState([])
    const [tieredCollection, setTieredCollection] = useState([])

    const [currentStep, setCurrentStep] = useState(1)
    const [canMoveOn, setCanMoveOn] = useState(false)

    return (
        <Box className="main"> 

            <Heading>
                Ranking Engine
            </Heading>

            <CollectionContext.Provider value={{collection, setCollection}}>
                <TieredCollectionContext.Provider value={{tieredCollection, setTieredCollection}}>
                    {currentStep === 1 ? <Step1 canMoveOn={(e) => setCanMoveOn(e)} /> : null}
                    {currentStep === 2 ? <Step2 collection={collection}/> : null}
                    {currentStep === 3 ? <Step3 tieredCollection={tieredCollection}/> : null}
                </TieredCollectionContext.Provider> 
            </CollectionContext.Provider>

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
                The ranking engine is still adding new features,&nbsp;
                <Link href="/whats-coming">
                    <b>check what is coming</b>
                </Link>.
            </Alert>
        </Box>
    )
}