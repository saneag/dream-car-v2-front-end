import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={310}
        height={200}
        viewBox="0 0 310 200"
        backgroundColor="#21252b"
        foregroundColor="#272c35"
    >
        <rect x="3" y="3" rx="20" ry="20" width="300" height="151" />
        <rect x="1" y="167" rx="10" ry="10" width="300" height="30" />
    </ContentLoader>
)

export default Skeleton