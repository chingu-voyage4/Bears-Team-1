module.exports = {
  users: [
    {
      _id: 1234,

      userInfo: {
        username: "misomighty",
        name: "Jordan",
        gitId: 9876
      },

      stats: {
        tweets: [
          {
            _id: 4321,
            user: 9867,
            text: "Just Amazing!",
            comments: [
              {
                user: 9867,
                text: "Lorem Ipsum Sit Amet",
                time: "February 23, 2018 06:29:00"
              },
              {
                user: 5678,
                text: "Ipsum Lorem Amet Sit!",
                time: "February 23, 2018 07:36:00"
              }
            ],
            likes: 3,
            retweets: 3,
            time: "February 23, 2018 06:27:00"
          }
        ],
        likes: [5678, 9012, 3456],
        followers: [5678, 3456],
        following: [9012, 3456]
      },
      avatarUrl: ""
    },

    {
      _id: 23545764,

      userInfo: {
        username: "JordanLeo7",
        name: "Jordan",
        gitId: 5678
      },
      stats: {
        tweets: [
          {
            _id: 8765,
            user: 5678,
            text: "Just Amazing!",
            comments: [
              {
                user: 9867,
                text: "Lorem Ipsum Sit Amet",
                time: "February 23, 2018 06:29:00"
              },
              {
                user: 9012,
                text: "Ipsum Lorem Amet Sit!",
                time: "February 23, 2018 07:36:00"
              }
            ],
            likes: 3,
            retweets: 3,
            time: "February 23, 2018 06:27:00"
          }
        ],
        likes: [9876, 9012, 3456],
        followers: [3456],
        following: [9012, 3456]
      },
      avatarUrl: ""
    },

    {
      _id: 23545764,

      userInfo: {
        username: "IronicSushi",
        name: "Joyce Ling",
        gitId: 9012
      },
      stats: {
        tweets: [
          {
            _id: 4567234,
            user: 9012,
            text: "Just Amazing!",
            comments: [
              {
                user: 9867,
                text: "Lorem Ipsum Sit Amet",
                time: "February 23, 2018 06:29:00"
              },
              {
                user: 9012,
                text: "Ipsum Lorem Amet Sit!",
                time: "February 23, 2018 07:36:00"
              }
            ],
            likes: 3,
            retweets: 3,
            time: "February 23, 2018 06:27:00"
          }
        ],
        likes: [9876, 3456],
        followers: [3456, 5678],
        following: [3456]
      },
      avatarUrl: ""
    },

    {
      _id: 23545764,

      userInfo: {
        username: "Tyler",
        name: "Tyler Del Rosario",
        gitId: 3456
      },
      stats: {
        tweets: [
          {
            _id: 8765,
            user: 3456,
            text: "Just Amazing!",
            comments: [
              {
                user: 9867,
                text: "Lorem Ipsum Sit Amet",
                time: "February 23, 2018 06:29:00"
              },
              {
                user: 9012,
                text: "Ipsum Lorem Amet Sit!",
                time: "February 23, 2018 07:36:00"
              }
            ],
            likes: 3,
            retweets: 3,
            time: "February 23, 2018 06:27:00"
          }
        ],
        likes: [3456],
        followers: [9012],
        following: [9012]
      },
      avatarUrl: ""
    }
  ]
};
