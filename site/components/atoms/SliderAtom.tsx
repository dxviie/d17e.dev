import {atom} from "recoil";

export const SLIDER_DEFAULT = 30;
export const sliderState = atom({
    key: 'sliderState',
    default: SLIDER_DEFAULT
});