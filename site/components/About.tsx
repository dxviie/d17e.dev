import {Box, Flex, HStack, Image, Link, Spacer, Text} from "@chakra-ui/react";
import {HeartIcon} from "./HeartIcon";
import {LinkedInIcon} from "./LinkedInIcon";

export default function About() {
    return (
        <>
            <Flex direction={'column'} align={'center'} minH={'100vh'}>
                <Image mt={'2rem'} width={'80vw'} maxWidth={'30rem'} src={'d17e.dev-logo.svg'} alt={'d17e.dev logo'}></Image>
                <Text fontSize={'xx-large'} borderBottomWidth={'1px'} borderBottomColor={'black'}>
                    code. art. ideas.
                </Text>
                <Box mt={'2rem'} textAlign={'center'} maxWidth={'20rem'}>
                    <Text fontSize={'lg'}>
                        I used to build other people's dreams.<br/>Now I build my own.*
                        <br/><br/>
                        I'm excited! Are you?<br/> <Link href={'https://tally.so/r/npePpB'} color={'teal.500'} target={'_self'}>Drop your email</Link> and stay tuned.
                    </Text>
                    <Text mt={'3rem'} mb={'2rem'} fontSize={'sm'}>
                        *I still build stuff for others some of my time so if you have a project where you think I can make a
                        difference, please do <Link href={'https://tally.so/r/mDqALj'} color={'teal.500'} target={'_self'}>get in touch</Link>.
                    </Text>
                </Box>
                <Spacer />
                <HStack width={'100%'} bg={'black'} color={'white'} padding={'1rem'} mt={'2rem'}>
                    <Flex direction={'column'} fontSize={'sm'}>
                        <Text>
                            made with <HeartIcon color={'orangered'} ml={'.2rem'} mr={'.2rem'}/> by David Vandenbogaerde
                        </Text>
                        <Box alignContent={'center'} justifyContent={'center'}>
                            <LinkedInIcon /> <Link href={'https://www.linkedin.com/in/d16de/'} target={'_blank'}>d16de</Link>
                        </Box>
                    </Flex>

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