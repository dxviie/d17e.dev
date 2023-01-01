import {Box, Center, VStack} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {borderState, gutterState, sidesState} from './atoms/CalendarState';
import {useEffect} from "react";
import paper, {Size} from "paper";

const CALENDAR_CANVAS_ID = 'calendar-canvas';
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 450;
const CANVAS_SIZE = new Size(CANVAS_WIDTH, CANVAS_HEIGHT);
let frame_count = 0;

export default function CalendarCanvas() {
    const gutter = useRecoilValue(gutterState);
    const sides = useRecoilValue(sidesState);
    const border = useRecoilValue(borderState);

    useEffect(() => {
        console.log("drawing frame " + frame_count++ + (frame_count === 1 ? ' <--------------------------------------------------------------------------------------------' : ' <'));
        paper.setup(CALENDAR_CANVAS_ID);
        drawCalendar(paper, CANVAS_SIZE, '', gutter, sides, border);
    }, [gutter, sides, border]);

    return (
        <>
            <Box>
                <Center>
                    <VStack>
                        <canvas id={CALENDAR_CANVAS_ID} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
                    </VStack>
                </Center>
            </Box>
        </>
    );
}

const getFillColorForMonthAndDay = (month: number, day: number) => {
    return MONTH_DAYS[month] > day ? 'white' : 'lightgrey';
}

const drawCalendar = (paper: paper.PaperScope, size: paper.Size, s: string, gutter: number, sides: number, border: number) => {

    console.log('gutter:', gutter, 'sides:', sides,'border:', border);

    const days = 31;
    const months = 12;

    const frame = new paper.Path.Rectangle({
        point: [0, 0],
        size: size,
        fillColor: 'white',
        strokeColor: 'black',
        strokeWidth: 0
    });
    frame.addTo(paper.project);

    // (..* 0.98): is to account for the rounding error, which could result in a calendar with
    // a full drawn width wider than the actual provided size
    // (days + 1): we add one more element to leave the space for the month's label
    const poly_radius = Math.round((size.width * 0.98)/ (days + 1)) - gutter - border;
    const full_poly_radius = poly_radius + gutter + border;
    const offset = Math.round(gutter/2 + poly_radius/2 + border/2);

    const desired_height = full_poly_radius*months + offset;
    console.log('desired height: ', desired_height);

    for (let d = 0; d < days; d++) {
        for(let m = 0; m < months; m++) {
            if (d === 0) {
                new paper.PointText({
                    point: [offset*.75, (m * full_poly_radius) + (offset * 1.35)],
                    content: MONTH_NAMES[m]
                })
            }
            const poly = new paper.Path.RegularPolygon({
                center: [d * full_poly_radius + offset + full_poly_radius,
                         m * full_poly_radius + offset],
                sides: sides,
                radius: poly_radius - gutter,
                strokeColor: 'black',
                strokeWidth: border,
                fillColor: getFillColorForMonthAndDay(m, d)
            });
            poly.addTo(paper.project);
        }
    }
};