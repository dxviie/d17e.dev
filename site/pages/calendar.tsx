import type { NextPage } from 'next'
import CalendarControls from "../components/CalendarControls";
import CalendarCanvas from "../components/CalendarCanvas";
import {Flex} from "@chakra-ui/react";

const Calendar: NextPage = () => {
    return (
        <main>
            <Flex direction={'column'}>
                <CalendarControls />
                <CalendarCanvas />
            </Flex>
        </main>
    )
}

export default Calendar