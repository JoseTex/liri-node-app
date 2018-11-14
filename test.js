const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const isSong = require("./liri.js").isSong;
const track = require("./liri.js").track;
const movie = require("./liri.js").movie;
const keysLoaded = require("./liri.js").keysLoaded;
const keyData = require("./liri.js").keyData;

chai.use(chaiHttp);

describe("isSong", function () {
  it("should check if there is a song input", function () {
    expect(isSong(track)).to.equal(track.val);
  });
  it("testing false comparison", function () {
    expect(track).to.equal(movie);
  });
});

describe("keysLoaded", function () {
  it("should check if the security keys were loaded", function () {
    expect(keysLoaded()).to.equal(true);
  });
  it("should make sure there isnt any access to the keys", function () {
    expect(keyData).to.be.a('number');
  });
});