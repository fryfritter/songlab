// app.test.js
const request = require("supertest");
const app = require("../app");

describe("App", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });
});

describe("App", () => {
  it("GET / should respond with Welcome to my homepage", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Welcome to my homepage");
      });
  });
});

describe("App", () => {
  it("GET / should respond with Welcome to my homepage", async () => {
    const response = await request(app).get("/").expect(200);
    expect(response.text).toEqual("Welcome to my homepage");
  });

  it("should respond correctly", async () => {
    const resp = await request(app).get("/").expect(200);
    const { text } = resp;

    expect(text).toEqual("Welcome to my homepage");
  });
});

describe("Post : /Songs", () => {
  it("should return new song object", async () => {
    const newSong = {
      name: "yeah song",
      artist: "lim peh",
    };
    const resp = await request(app).post("/songs").send(newSong).expect(201);
    // expect(resp.body).toEqual(newSong);
    expect(resp.body).toMatchObject(newSong);
  });
});

describe("Get : /Songs", () => {
  it.only("should return list of songs ", async () => {
    const resp = await request(app).get("/songs").expect(200);

    // const expectedResult = [
    //   { id: 1, name: "someSongName", artist: "someSongArtist" },
    //   { id: 2, name: "anotherSongName", artist: "anotherArtist" },
    // ];

    const expectedResult1 = { name: "someSongName", artist: "someSongArtist" };

    const expectedResult2 = {
      name: "anotherSongName",
      artist: "anotherArtist",
    };

    const responseObject = resp.body;
    expect(responseObject.length).toEqual(2);
    expect(responseObject[0]).toMatchObject(expectedResult1);
    expect(responseObject[1]).toMatchObject(expectedResult2);
  });
});
