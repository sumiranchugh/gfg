"use strict";
import Request from "request";
import HitElastic from "../src/utils/HitElastic";
import {data} from "../__mocks__/sampleData"

// beforeEach(() => {
//     Request.mockClear();
// });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

test("creation of elastic object", () => {
  const hit = new HitElastic();
  return expect(hit).toBeTruthy();
});
test("call elastic pass no data", async () => {
  const hit = new HitElastic();
  const results = await hit.retrieve({query: { match_all: {} } });
  return expect(results).toStrictEqual([]);
});
test("call elastic pass with data", async () => {
    const hit = new HitElastic();
    const results = await hit.retrieve({query: { match: {} } });
    return expect(results).toStrictEqual(data.hits.hits);
  });
  test("call elastic fail", async () => {
    const hit = new HitElastic();
    expect(hit.retrieve({query: { fail: {} } })).rejects.toEqual(new Error("Some Error Occurred"));
  });

