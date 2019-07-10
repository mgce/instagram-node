export function mapPostsToDto(posts){
    return posts.map(post => ({
        author: post.author,
        authorId: post.authorid,
        commentsCount:post.commentscount,
        dateCreated:post.dateCreated,
        description:post.description,
        id:post.id,
        imageId:post.imageid,
        liked:post.liked,
        likesCount:post.likescount
      }))
}