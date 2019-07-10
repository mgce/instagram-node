import { PostModel } from "../dal/models/post.model";
import { PostDto, DateDto } from "@instagram-node/common";

export const mapPostsToDto = (
    posts: PostModel[], 
    userId: number, 
    likedByUser: Function, 
    getLikesCount: Function, 
    countCommentsForPost: Function
    ) => {
    return Promise.all(posts.map(async (post) => {
        const dto = new PostDto();
        dto.setId(post.id);
        dto.setAuthor(post.username);
        dto.setDescription(post.description);
        dto.setImageid(post.imageId);
        dto.setDatecreated(dateToDto(post.dateCreate));
        const liked = await likedByUser(post.id, userId)
        dto.setLiked(liked);
        const likesCount = await getLikesCount(post.id);
        dto.setLikescount(likesCount);
        const commentsCount = await countCommentsForPost(post.id);
        dto.setCommentscount(commentsCount);
        return dto;
    }))
}

export const dateToDto = (date: Date): DateDto => {
    const dto = new DateDto();
    dto.setDay(date.getDay())
    dto.setMonth(date.getMonth())
    dto.setYear(date.getFullYear())
    return dto;
}