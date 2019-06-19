export const commonConfig = {
    ports: {
        apiGateway: 5000,
        userService: 5001,
        imageService: 5002,
        postService: 5003
    },
    // host: () => {
    //     if(process.env.NODE_ENV === "production")
    //         return "192.168.1.0"
    //     return "0.0.0.0"
    // }
    host: "192.168.0.106"
}