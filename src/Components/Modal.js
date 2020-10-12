import React from 'react'
import { 
    Modal as CHModal, 
    ModalOverlay, 
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Link
} from '@chakra-ui/core'

export default function Modal(props) {

    return (
        <CHModal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>About and Contact</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            <b>Author</b>: Alfredo Medina <br/>
                            <b>Contact</b>: info@amedpal.com <br/>
                            <Link color="teal.500"><b>GitHub repo</b></Link> <br/>
                            <Link href="https://www.buymeacoffee.com/amedpal" isExternal color="teal.500"><b>Buy me a coffee</b></Link>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        yo yo yo
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </CHModal>
    )
}