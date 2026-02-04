module.exports = {
    jwt: {
        secrets: process.env.JWT_SECRET ?? "secret123"
    }
}