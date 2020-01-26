import React from 'react'
import Header from './Header'
import OwnerList from './OwnerList'
import AddItems from './AddItems'
import RenteeList from './RenteeList'
import AddRequests from './AddRequests.js'
import CategoryList from './CategoryList'
import ModeSelector from './ModeSelector'

const OWNER_MODE = 1
const RENTEE_MODE = 2
const CATEGORY_MODE = 3

class Console extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: OWNER_MODE
        }
        this.handleChangeMode = this.handleChangeMode.bind(this)
    }

    handleChangeMode(event) {
        this.setState({mode: event.target.value})
    }

    render() {
        if (this.state.mode == OWNER_MODE) {
            return (
                <div>
                <Header></Header>
                <ModeSelector handleChangeMode={this.handleChangeMode} mode={this.state.mode}></ModeSelector>
                <OwnerList items={this.props.items}></OwnerList>
                <AddItems updateItems={this.props.updateItems}></AddItems>
            </div>
            )
        } else if (this.state.mode == RENTEE_MODE) {
            return (
                <div>
                    <Header></Header>
                    <ModeSelector handleChangeMode={this.handleChangeMode} mode={this.state.mode}></ModeSelector>
                    <RenteeList requests={this.props.requests}></RenteeList>
                    <AddRequests updateRequests={this.props.updateRequests}></AddRequests>
                </div>
            )
        } else {
            return (
                <div>
                    <Header></Header>
                    <ModeSelector handleChangeMode={this.handleChangeMode} mode={this.state.mode}></ModeSelector>
                    <CategoryList categories={this.props.categories}></CategoryList>
                </div>
            )
        }
    }
}

export default Console