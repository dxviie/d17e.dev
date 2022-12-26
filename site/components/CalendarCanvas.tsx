import {Box, Center, VStack} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {borderState, gutterState, sidesState} from './atoms/CalendarState';
import {useEffect} from "react";
import paper, {Size} from "paper";

const CALENDAR_CANVAS_ID = 'calendar-canvas';
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
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

const drawCalendar = (paper: paper.PaperScope, size: paper.Size, s: string, gutter: number, sides: number, border: number) => {

    console.log(gutter, sides, border);
    const rows = 31;
    const cols = 12;

    const frame = new paper.Path.Rectangle({
        point: [0, 0],
        size: size,
        strokeColor: 'black',
        strokeWidth: 1
    });
    frame.addTo(paper.project);

    const poly_radius = Math.round(size.width/cols) - gutter;
    for (let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            const poly = new paper.Path.RegularPolygon({
                center: [r * (poly_radius+gutter) + gutter/2 + poly_radius/2,
                         c * (poly_radius+gutter) + gutter/2 + poly_radius/2],
                sides: sides,
                radius: poly_radius - gutter,
                strokeColor: 'black',
                strokeWidth: border
            });
            poly.addTo(paper.project);
        }
    }
};