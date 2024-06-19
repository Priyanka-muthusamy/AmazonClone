import { Helmet } from "react-helmet-async"; //using this helmet to set the title in the head tag

//here using this to change the head tag title val - here sent title as a props
export default function MetaData({title}) {
    return (
        <Helmet>
            <title>{`${title} - JVLcart`}</title>
        </Helmet>
    )
}