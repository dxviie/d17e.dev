import {MediaDTO} from "../../services/types";
import Image from "next/image";
import {imageLoader} from "../../services/ContentApi";
import {Box} from "@chakra-ui/react";

export default function Cover({cover}: { cover: MediaDTO }) {
    return (
        <>
            <Box width={"100%"} height={"20rem"} position={'relative'}>
                <Image src={cover.url} alt={cover.alternativeText} loader={imageLoader} layout={"fill"} objectFit={"cover"}></Image>
            </Box>
        </>
    );
}