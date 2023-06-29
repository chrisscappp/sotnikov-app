import { memo } from 'react'

const ErrorComponent = ({errStatus}) => {
    return (
        <>
            <h2>Error with status code {errStatus}</h2>
        </>
    )
}

export default memo(ErrorComponent)