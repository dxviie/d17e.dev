import {Center, Container, Image, Stack, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

export default function About() {
    return (
        <>
            <Container minH='80vh'>
                <Stack spacing={{base: 2}} mt={{base: 50}}>
                    <Image color='blue' src='d17e.dev-logo.svg' alt='d17e.dev logo'></Image>
                    <Center>
                        <Text fontSize='2em'>
                            code. art. ideas.
                        </Text>
                    </Center>
                </Stack>
                <Stack spacing={{base: 0}} mt={{base: 100}} ml={{base: 10}}>
                    <span>KVK - 87650770</span>
                    <span>BTW - NL004463884B92</span>
                </Stack>
                <Stack spacing={{base: 0}} mt={{base: 5}} ml={{base: 10}}>
                    <span>
                        <a href='https://www.linkedin.com/in/d16de/'>
                            <ExternalLinkIcon mr={{base: 2}}/>linkedIn
                        </a>
                    </span>
                </Stack>
            </Container>
        </>

    );
}