# Wuphfer Frontend (Twitter Clone)

Wuphfer Frontend - A real time twitter clone built in React/Redux-Toolkit and TailwindCSS.
The API for this client is developed in Python/Django. [Backend API Repo](https://github.com/kaustubh-jsr/wuphfer_backend)

## Features

The app has the following major features

### User:

- Create Account
- See Profile
- Login
- Logout
- Edit Profile
- Follow User
- Unfollow User
- Edit Profile (Change Avatar, Cover Image, Bio, Website)
- Light/dark mode toggle

### Posts:

- Create Post
- Bookmark Post
- Like/Unlike Post
- Comment on Post
- Like/Unlike Comment
- Retweet Post
- Error toast on reaction(like/comment/retweet) on deleted post
- Notification on reaction(like/comment/retweet) to post/comment
- See Post Likes
- See Post Retweets

### Pages

- Home (Feed)
- Profile (Self/Non Follower/Follower)
- Notifications
- Bookmarks
- Explore

## Tech Stack

**Client:** React, Redux Toolkit, TailwindCSS

**Server:** Python, Django, Channels, Redis-server


## Run Locally

Clone this project, and also clone the [API repo](https://github.com/kaustubh-jsr/wuphfer_backend) this project utilises for backend

```bash
  git clone https://github.com/kaustubh-jsr/wuphfer_frontend.git
```

Go to the project directory

```bash
  cd wuphfer_frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


