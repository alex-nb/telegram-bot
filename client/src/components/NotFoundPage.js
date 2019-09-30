import React from 'react'
import PropTypes from 'prop-types'

const NotFoundPage = props => {
    return (
        <div>
            <h1>Page not found!</h1> 
        </div>
    )
}

NotFoundPage.propTypes = {
    children: PropTypes.node
}

export default NotFoundPage
