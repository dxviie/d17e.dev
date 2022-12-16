import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";
import {sliderState} from './atoms/SliderAtom';
import {useRecoilState} from "recoil";

export default function CalendarControls() {
    const [sliderValue, setSliderValue] = useRecoilState(sliderState);
    return (
        <>
            <Box bgColor={'lightblue'} width={'3rem'} padding={'1rem'}>
                <Slider
                    aria-label='slider-ex-1'
                    defaultValue={sliderValue}
                    orientation={'vertical'}
                    height={'300px'}
                    onChange={(v) => setSliderValue(v)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
        </>
    )
}