export default [
  {
    id: 1,
    name: "Jiffy",
    reqs: [
      { id: 2, name: "Frameboss", crud: "GET" },
      { id: 3, name: "Clock App", crud: "PUT" },
      { id: 4, name: "TeamSprint", crud: "DEL" },
      {
        id: "pop02",
        name: "Testing Second",
        crud: "POST",
        url: "https://wikipedia.com/search",
        body: {
          type: "",
          payload: "",
        },
        params: [
          {
            id: "po33",
            key: "wikilimit",
            value: "5",
            active: true,
          },
          {
            id: "qwe2x2",
            key: "wikipage",
            value: "2",
            active: true,
          },
        ],
        headers: [
          {
            id: "pop2j03",
            key: "Authorization",
            value: "Bearer wikiqwopqfo3pojxp23",
            active: true,
          },
        ],
      },
      {
        id: "pop01",
        name: "Testing Request",
        crud: "PUT",
        url: "https://Google.com/search",
        body: {
          type: "",
          payload: "",
        },
        params: [
          {
            id: "po32",
            key: "limit",
            value: "5",
            active: true,
          },
          {
            id: "qwe102",
            key: "page",
            value: "2",
            active: true,
          },
        ],
        headers: [
          {
            id: "pop203",
            key: "Authorization",
            value: "Bearer qwopqfo3pojxp23",
            active: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Frameboss",
    reqs: [
      { id: 2, name: "Frameboss", crud: "GET" },
      { id: 3, name: "Clock App", crud: "PUT" },
      { id: 4, name: "TeamSprint", crud: "DEL" },
      { id: 5, name: "Restmate", crud: "POST" },
    ],
  },
  {
    id: 3,
    name: "Clock App",
    reqs: [
      { id: 2, name: "Frameboss", crud: "GET" },
      { id: 3, name: "Clock App", crud: "PUT" },
      { id: 4, name: "TeamSprint", crud: "DEL" },
      { id: 5, name: "Restmate", crud: "POST" },
    ],
  },

  { id: 4, name: "Restmate" },
  {
    id: 5,
    name: "TeamSprint",
    reqs: [
      { id: 2, name: "Frameboss", crud: "GET" },
      { id: 3, name: "Clock App", crud: "PUT" },
      { id: 4, name: "TeamSprint", crud: "DEL" },
      { id: 5, name: "Restmate", crud: "POST" },
    ],
  },
];
