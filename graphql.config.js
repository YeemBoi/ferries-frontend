module.exports = {
  schema: "schema.graphql",
  documents: ["apollo/**/*.{graphql,js,ts,jsx,tsx}"],
  extensions: {
    endpoints: {
        default: {
          url: "http://127.0.0.1:8000/graphql",
        },
    },
  },
}