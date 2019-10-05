"use strict";

import app from "../src/app";
import request from "supertest";
jest.mock('request');

test("get all products pass",  async () => {

  const result =  await request(app).get("/api/products");
  expect.assertions(1);
  return expect(result.status).toBe(200);
});

test("get all products filter",  async () => {

  const result =  await request(app).get("/api/products/filter?q=search");
  expect.assertions(2);
  expect(result.status).toBe(200);
  expect(result.body[0].name).toBe('test');
});
