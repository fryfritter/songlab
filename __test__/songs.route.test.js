const request = require("supertest");
const express = require("express");
const app = express();
const songRouter = require("./../routes/songs.route");
app.use(express.json());

app.use("/songs", songRouter); //mount router

describe("Get : /Songs", () => {
  it("should return list of songs ", async () => {
    const resp = await request(app).get("/songs").expect(200);

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

  it("should return one song", async () => {
    const resp = await request(app).get("/songs/1").expect(200);

    const expectedResult1 = { name: "someSongName", artist: "someSongArtist" };
    const responseObject = resp.body;
    expect(responseObject[0]).toMatchObject(expectedResult1);
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

describe("Put : /Songs", () => {
  it("should update 2nd song ", async () => {
    const updatedSongDetail = {
      name: "updated name",
      artist: "updated artist",
    };
    const resp = await request(app)
      .put("/songs/2")
      .send(updatedSongDetail)
      .expect(200);

    expect(resp.body).toMatchObject(updatedSongDetail);
  });
});

describe("Delete :/Songs", () => {
  it("should remove 2nd song", async () => {
    const deletedSong = {
      id: 2,
      name: "anotherSongName",
      artist: "anotherArtist",
    };

    const resp = await request(app).delete("/songs/2").expect(200);

    expect(resp.body).toMatchObject(deletedSong);
  });
});
