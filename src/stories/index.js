import React from 'react';
import { storiesOf } from '@storybook/react';

// 1. import axios and MockAdapter
import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter';

// 2. create the mock
const mock = new MockAdapter(axios);

// 2.1 the api request to be intercepted has to match exactly
const API_REQUEST = 'https://swapi.co/api/planets/1';

// 3. your component
class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentDidMount() {

        const that = this;

        axios.get(API_REQUEST).
            then(function(response) {
                that.setState({ data: response.data })
            }).catch((error) => {
                console.error('Error >>>>', error);
            });

    }

    render() {

        return (
            <div>
                Response is <pre>{JSON.stringify(this.state.data, null, '  ')}</pre>
            </div>
        );
    }
}

storiesOf('Mocking Api responses with Axios and axios-mock-adapter', module)
  .add('Test', () => {

    // 4. create the mock inside the story
    // if this is outside it'll mess up with other axios instances/requests
    mock.onGet(API_REQUEST).reply(200, { test: 'some mock data' });

    return <Test />
  });
