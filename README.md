# Mocking Api response in Storybook using Axios and axios-mock-adapter

Originally pusblised on Medium: https://medium.com/@rafaelrozon/mock-axios-storybook-72404b1d427b

1. Install axios-mock-adapter

    `npm install axios-mock-adapter --save-dev`

2. Then in your stories:

```
import React from 'react';
import { storiesOf } from '@storybook/react';

// 1. import axios and MockAdapter
import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter';

// 2. create the mock
const mock = new MockAdapter(axios);

// 2.1 the api request to be intercepted has to match exactly
const API_REQUEST = 'https://swapi.co/api/planets/1';

// 3. your component (just an example)
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
```

My Test component is just to illustrate.  What is important here is:
- Without the mock adapter the response would be data for the planet Tatooine from the Star Wars api. But, the mock adapter intercepts the request and return ` { test: 'some mock data' }`. Pretty cool!
- The api call you specify in mock.onGet has to match exactly what it's being requested in your axios get call. If in doubt, check the config object of the axios response.
- Do not add the mock.onGet outside the `.add('Component', () => {....})` function because it'll mess up other axios calls that may be in other stories. Basically, the mock.onGet will be restricted to its scope
- You can pass `{ delayResponse: 2000 })` when instantiating the axios-mock-adapter supports to simulate the network delay



