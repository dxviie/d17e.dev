import {Box, Center} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {sliderState} from './atoms/SliderAtom';

export default function CalendarCanvas() {
    const sliderValue = useRecoilValue(sliderState);
    return (
        <>
            <Box width={'10rem'}>
                <Center>
                    <>
                        canvas = {sliderValue}
                    </>
                </Center>
            </Box>
        </>
    );
}