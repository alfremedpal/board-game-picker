import React, { useState } from 'react'
import { 
    Box,
    Heading,
    Button,
    ButtonGroup,
    Alert, 
    AlertIcon,
    Link, Text,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useClipboard
} from "@chakra-ui/react"

import { CollectionContext, TieredCollectionContext } from '../Components/CollectionContext'
import Step0 from '../Components/RankingSteps/Step0'
import Step1 from '../Components/RankingSteps/Step1'
import Step2 from '../Components/RankingSteps/Step2'
import Step3 from '../Components/RankingSteps/Step3'

export default function Ranking() {

    const [collection, setCollection] = useState([])
    const [tieredCollection, setTieredCollection] = useState([])

    const [currentStep, setCurrentStep] = useState(1)
    const [canMoveOn, setCanMoveOn] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { hasCopied, onCopy } = useClipboard(JSON.stringify(tieredCollection, null, 4))

    const importCollectionCallback = () => {
        setCurrentStep(3)
    }

    return (
        <>
        <Box className="main"> 

            <Heading>
                Ranking Engine
            </Heading>

            <CollectionContext.Provider value={{collection, setCollection}}>
                <TieredCollectionContext.Provider value={{tieredCollection, setTieredCollection}}>
                    {currentStep === 0 ? <Step0 importCollection={importCollectionCallback}/> : null}
                    {currentStep === 1 ? <Step1 canMoveOn={(e) => setCanMoveOn(e)} /> : null}
                    {currentStep === 2 ? <Step2 collection={collection}/> : null}
                    {currentStep === 3 ? <Step3 tieredCollection={tieredCollection}/> : null}
                </TieredCollectionContext.Provider> 
            </CollectionContext.Provider>

            <ButtonGroup variant="solid" spacing="6" style={{margin:'2% 0'}}>
                {
                    currentStep === 3 ?
                    <>
                        <Button colorScheme="teal" onClick={() => window.location.reload()}>Rank again</Button>
                        <Button colorScheme="teal" onClick={onOpen}>Export list</Button>
                    </>
                    :
                    <>
                        <Button
                            onClick={() => setCurrentStep(currentStep - 1)} 
                            colorScheme="teal"
                            size="md" 
                            width="100px"
                            disabled={currentStep===0}
                        >
                            {currentStep === 1 ? 'Import' : 'Previous'}
                        </Button>
                        <Button
                            onClick={() => setCurrentStep(currentStep + 1)} 
                            colorScheme="teal"
                            size="md" 
                            width="100px"
                            disabled={currentStep === 1 && !canMoveOn}
                        >
                            {currentStep === 0 ? 'Rank' : 'Next'}
                        </Button>
                    </>
                }
                
            </ButtonGroup>

            <Alert status="info" fontSize="sm">
                <AlertIcon />
                The ranking engine is still adding new features,&nbsp;
                <Link href="/whats-coming">
                    <b>check what is coming</b>
                </Link>.
            </Alert>
            <Alert status="info" fontSize="sm" marginTop="2%">
                <AlertIcon />
                Report any errors or request features:&nbsp;<b>info@amedpal.com</b>
            </Alert>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Your collection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>
                    Copy this and save it to a text file. You can then import it at a later time
                    to see your tiered collection again
                </Text>
                <Textarea value={JSON.stringify(tieredCollection, null, 4)} isReadOnly/>
                <Button
                    onClick={onCopy}
                    colorScheme="teal"
                    margin="2% 0"
                >
                    {hasCopied ? "Copied" : "Copy"}
                </Button>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}