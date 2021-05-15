import React from 'react'
import {
    Box,
    Heading,
    Text,
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'

export default function Step3(props) {

    const sGames = props.tieredCollection.filter(g => g.tier === 'S')
    const aGames = props.tieredCollection.filter(g => g.tier === 'A')
    const bGames = props.tieredCollection.filter(g => g.tier === 'B')
    const cGames = props.tieredCollection.filter(g => g.tier === 'C')
    const dGames = props.tieredCollection.filter(g => g.tier === 'D')
    const eGames = props.tieredCollection.filter(g => g.tier === 'E')
    const fGames = props.tieredCollection.filter(g => g.tier === 'F')

    return (
        <Box>
             <Heading as="h3" size="lg">Step 3: Visualize your tiered collection!</Heading>
            <Text color="gray.500" align="left">
                Here's your list
            </Text>
            <div style={{overflowX:'scroll', width:'100%'}}>
                <Table variant="simple" minW="100%">
                    <Thead>
                        <Tr>
                            <Th>Tier</Th>
                            <Th>Games</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td textAlign="center" bgColor="red.300" fontSize="lg" fontWeight="bold">S</Td>
                            <Td bgColor="red.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        sGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="orange.300" fontSize="lg" fontWeight="bold">A</Td>
                            <Td bgColor="orange.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        aGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="yellow.300" fontSize="lg" fontWeight="bold">B</Td>
                            <Td bgColor="yellow.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        bGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="green.300" fontSize="lg" fontWeight="bold">C</Td>
                            <Td bgColor="green.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        cGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="teal.300" fontSize="lg" fontWeight="bold">D</Td>
                            <Td bgColor="teal.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        dGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="cyan.300" fontSize="lg" fontWeight="bold">E</Td>
                            <Td bgColor="cyan.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        eGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td textAlign="center" bgColor="blue.300" fontSize="lg" fontWeight="bold">F</Td>
                            <Td bgColor="blue.100">
                                <div style={{whiteSpace:'nowrap', width:'max-content'}}>
                                    {
                                        fGames.map(g => (
                                            <Image
                                                display="inline-block"
                                                key={g.name} 
                                                h="75px"
                                                src={g.thumbnail} alt={g.name}
                                                margin="0 5px"
                                            />
                                        ))
                                    }
                                </div>
                            </Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td>Tier</Td>
                            <Td>Games</Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </div>
        </Box>
    )
}