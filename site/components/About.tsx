import {Box, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import {HeartIcon} from "./HeartIcon";

export default function About() {
    return (
        <>
            <Flex direction={'column'} align={'center'} minH={'100vh'}>
                <Image mt={'2rem'} width={'80%'} maxWidth={'30rem'} src={'d17e.dev-logo.svg'} alt={'d17e.dev logo'}></Image>
                <Text fontSize='2em'>
                    code. art. ideas.
                </Text>
                <Box>
                    <Text>
                        Hello
                    </Text>
                </Box>
                <Spacer />
                <HStack width={'100%'} bg={'black'} color={'white'} padding={'1rem'} mt={'1rem'}>
                    <Text fontSize={'sm'}>
                        made with <HeartIcon ml={'.2rem'} mr={'.2rem'}/> by David Vandenbogaerde
                    </Text>
                    <Spacer />
                    <Flex direction={'column'}>
                        <span>KVK - 87650770</span>
                        <span>BTW - NL004463884B92</span>

                    </Flex>


                </HStack>
            </Flex>
        </>

    );
}