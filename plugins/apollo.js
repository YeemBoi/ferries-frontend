export default (context) => {
    return {
        httpEndpoint:        process.env.INTERNAL_GRAPHQL_URL || 'http://ferries-backend.herokuapp.com/graphql',
        browserHttpEndpoint: process.env.EXTERNAL_GRAPHQL_URL || 'http://ferries-backend.herokuapp.com/graphql',
    }
}