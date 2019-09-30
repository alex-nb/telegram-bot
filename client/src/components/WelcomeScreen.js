import React from 'react'
import PropTypes from 'prop-types'

const WelcomeScreen = props => {
    return (
        <div>
            <h1>Welcome Screen!!</h1>
        </div>
    )
}

WelcomeScreen.propTypes = {
    children: PropTypes.node
}

export default WelcomeScreen
