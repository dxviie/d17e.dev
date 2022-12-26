import {atom} from "recoil";

export const GUTTER_MAX = 30;
export const GUTTER_MIN = 0;
export const GUTTER_DEFAULT = 10
export const gutterState = atom({
    key: 'cal-gutter',
    default: GUTTER_DEFAULT
});

export const SIDES_MAX = 8;
export const SIDES_MIN = 0;
export const SIDES_DEFAULT = 3
export const sidesState = atom({
    key: 'cal-sides',
    default: SIDES_DEFAULT
});

export const BORDER_MAX = 20;
export const BORDER_MIN = 0;
export const BORDER_DEFAULT = 5
export const borderState = atom({
    key: 'cal-border',
    default: BORDER_DEFAULT
});