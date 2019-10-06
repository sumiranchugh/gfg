import request from "request";
import fs from "fs";
import path from "path";
import { elasticIP, elasticProductIP } from "../config";

export default class HitElastic {
  retrieve(queryClause, ip) {
    const url = !ip ? elasticProductIP : ip;
    const options = {
      uri: url,
      json: queryClause
    };
    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log("error:", error);
          reject(new Error("Some Error Occurred"));
        } else {
          resolve(
            body.hits && body.hits.hits && body.hits.hits.length > 0
              ? body.hits.hits
              : []
          );
        }
      });
    });
  }
}
