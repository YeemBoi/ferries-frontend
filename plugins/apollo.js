export default (context) => {
    return {
        httpEndpoint:        process.env.INTERNAL_GRAPHQL_URL || 'https://ferries-backend.herokuapp.com/graphql',
        browserHttpEndpoint: process.env.EXTERNAL_GRAPHQL_URL || 'https://ferries-backend.herokuapp.com/graphql',
    }
}