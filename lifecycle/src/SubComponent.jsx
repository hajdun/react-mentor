import React from 'react';
import axios from 'axios';

class SubComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            isLoading: false,
            fetched: false
        }
    }

    componentDidMount() {
        this.getCustomers()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fetched !== this.state.fetched) {
            this.getCustomers()
            console.log("success")
        }
    }

    // retrieve all customers on a GET http://localhost:3001/customers request
    getCustomers = () => {
        axios.get('http://localhost:3001/customers').then(customers => {
            console.log(customers);
            this.setState({
                customers: customers.data,
                isLoading: false
            })
        });
    }

    // save a new customer to the customer table on a POST http://localhost:3001/customers request
    postCustomer = () => {
        const requestBody = {
            name: "Hendrikksen Customer"
        }
        this.setState({ ...this.state, isLoading: true, fetched: false });
        axios.post('http://localhost:3001/customers', requestBody)
            .then((cust) => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    fetched: true
                })
            })
            .catch(e => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                })
            });

    }


    render() {
        const { isLoading, customers } = this.state
        return (
            <div className="App" >
                <div>
                    <button onClick={this.postCustomer}>Perform "POST"</button>
                </div>
                {!isLoading && <div>
                    <pre>{JSON.stringify(customers)}</pre>
                </div>}
                { isLoading && "LOADING"}
            </div >
        );
    }
}

export default SubComponent;
