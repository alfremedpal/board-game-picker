import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Link
  } from "@chakra-ui/react"

export default function BGModal(props) {

    // IMPORTANT: The modal is currently broken with framer-motion to 4.1.13.
    // To make it work again motionPreset="none" seems to do the trick
    // GitHub thread: https://github.com/chakra-ui/chakra-ui/issues/3967

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} motionPreset="none">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>About and Contact</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        <b>Author</b>: Alfredo Medina <br/>
                        <b>Contact</b>: info@amedpal.com <br/>
                        <Link href="https://github.com/alfremedpal/board-game-picker" isExternal color="teal.500"><b>GitHub repo</b></Link> <br/>
                        <Link href="https://www.buymeacoffee.com/amedpal" isExternal color="teal.500"><b>Buy me a coffee</b></Link>
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}