import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";

export default function CalendarControls() {
    return (
        <>
            <Box bgColor={'lightblue'} width={'3rem'} padding={'1rem'}>
                <Slider aria-label='slider-ex-1' defaultValue={30} orientation={'vertical'} height={'300px'}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
        </>
    )
}