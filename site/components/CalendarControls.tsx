import {Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack} from "@chakra-ui/react";
import {
    BORDER_MAX, BORDER_MIN,
    borderState,
    GUTTER_MAX,
    GUTTER_MIN,
    gutterState,
    SIDES_MAX,
    SIDES_MIN,
    sidesState
} from './atoms/CalendarState';
import {useRecoilState} from "recoil";

export default function CalendarControls() {
    const [gutterValue, setGutterValue] = useRecoilState(gutterState);
    const [sidesValue, setSidesValue] = useRecoilState(sidesState);
    const [borderValue, setBorderValue] = useRecoilState(borderState);
    return (
        <>
            <VStack bgColor={'lightblue'} width={'20rem'} padding={'1rem'}>
                {buildSlider('gutter', gutterValue, GUTTER_MIN, GUTTER_MAX, setGutterValue)}
                {buildSlider('sides', sidesValue, SIDES_MIN, SIDES_MAX, setSidesValue)}
                {buildSlider('border', borderValue, BORDER_MIN, BORDER_MAX, setBorderValue)}
            </VStack>
        </>
    )
}

const buildSlider = (label: string, value: number, min: number, max: number, setter: Function) => {
    return (<>
        <Text>{label}</Text>
        <Slider
            aria-label={'slider-' + label}
            defaultValue={value}
            orientation={'horizontal'}
            onChange={(v) => setter(v)}
            min={min}
            max={max}
        >
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </Slider>
    </>);
}