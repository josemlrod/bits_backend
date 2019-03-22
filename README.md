[![Build Status](https://travis-ci.org/JayRodrig/bits_backend.svg?branch=master)](https://travis-ci.org/JayRodrig/bits_backend) [![Coverage Status](https://coveralls.io/repos/github/JayRodrig/bits_backend/badge.svg?branch=mybranch)](https://coveralls.io/github/JayRodrig/bits_backend?branch=mybranch)

# BITS API

## API STUCTURE

> #### USER ROUTES:
>
> * **Post User:**
>   * `/user/` – **POST**🔓
>   * Will create a new user and save it to the database.
>
> * **Read User:**
>   * `/user/:user_id` –  **GET**🔓
>   * Will retrieve data of the specified user.
> * **Update User:**
>   * `/user/:user_id` –  **PUT**🔒
>   * Will allow the client to pass in a new user obj and update the specified user.
> * **Delete User:**
>   * `/user/:user_id` – **DELETE**🔒 
>   * Will delete the specified user.
>
> #### POST ROUTES:
>
> * **Read Post:**
>   * `/post/:post_id` – **GET**🔓
>   * Will retrieve data of specified post.
> * **Post - Post:**
>   * `/post/` – **POST**🔒
>   * Will create new post and save it to the database.
> * **Update Post:**
>   * `/post/:post_id` – **PUT**🔒
>   * Will allow the client to pass in a new post obj and update the specified post.
> * **Delete Post:**
>   * `/post/:post_id` – **DELETE**🔒
>   * Will delete the specified post.
>
> #### COMMENT ROUTES: 
>
> * **Post Comment:**
>   * `/comment/` – **POST**🔒
>   * Will create a new comment and save it to the database.
> * **Delete Comment:**
> * `/comment/:comment_id` – **DELETE**🔒
> * Will delete the specified comment.
>
> #### LIKE ROUTES:
>
> * **Post Like:**
>   * `/like/` – **POST**🔒
>   * Will create new like and save it to the database.
> * **Delete Like:**
>   * `/like/:like_id` – **DELETE**🔒
>   * Will delete the specified like.
>
> #### FOLLOW ROUTES:
>
> * **Read Followers:**
>   * `/follow/:followed_user_id` – **GET**🔒
>   * Will retrieve the data about the followers of the specified user.
> * **Post Follow:**
>   * `/follow/` – **POST**🔒
>   * Will create new follow obj and save it to the database.
> * **Delete Follow:**
>   * `/follow/:follower_user_id/:followed_user_id` – **DELETE**🔒
>   * Will delete the specified follow relation between follower and followed.
