import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddRequestButton from './AddRequestButton'

class AddRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          name: '',
          quantity: '',
          category: '',
          date: ''
        }
    
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
      }
    
      handleNameChange(event) {
        this.setState({name: event.target.value})
      }
    
      handleQuantityChange(event) {
        this.setState({quantity: event.target.value})
      }
    
      handleCategoryChange(event) {
        this.setState({category: event.target.value})
      }
    
      handleDateChange(event) {
        this.setState({date: event.target.value})
      }

      render() {
        return (<div
        style={{
          backgroundColor: 'white',
          marginTop: '40px',
          paddingTop: '20px',
          paddingBottom: '20px'
        }}>
          <form noValidate autoComplete="off"
        style={{
            backgroundColor: 'white',
            textAlign: 'center',
            display:'flex',
            justifyContent:'center'
        }}>
          <TextField 
            style={{marginRight: '10px'}}
            id="Name" 
            label="Name" 
            variant="filled" 
            value={this.state.name} 
            onChange={(this.handleNameChange)}
          />
          <TextField 
            style={{marginRight: '10px'}} 
            id="Category" 
            label="Category" 
            variant="filled" 
            value={this.state.category} 
            onChange={this.handleCategoryChange}
          />
          <TextField 
            style={{marginRight: '10px'}} 
            id="Quantity" label="Quantity" 
            variant="filled" 
            value={this.state.quantity} 
            onChange={this.handleQuantityChange}
          />
          <TextField 
            style={{marginRight: '10px'}} 
            id="Date" 
            label="Date" 
            variant="filled" 
            value={this.state.date} 
            onChange={this.handleDateChange}
          />
          <AddRequestButton 
            updateRequests={this.props.updateRequests}
            name={this.state.name}
            quantity={this.state.quantity}
            date={this.state.date}
            category={this.state.category}>
          </AddRequestButton>
        </form>
        </div>
      )
      }
}

export default AddRequests
