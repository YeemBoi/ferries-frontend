export default (context) => {
    return {
        httpEndpoint:        process.env.INTERNAL_GRAPHQL_URL || 'http://127.0.0.1:8000/graphql',
        browserHttpEndpoint: process.env.EXTERNAL_GRAPHQL_URL || 'http://10.0.0.81:8000/graphql',
    }
}