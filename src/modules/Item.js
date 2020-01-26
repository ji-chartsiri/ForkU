import React from 'react'


class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div
            style={{
                backgroundColor: '#3CB371',
            }}>
                {this.props.name + ': ' + this.props.quantity + ' ' + this.props.category}
            </div>
        )
    }
}

export default Item