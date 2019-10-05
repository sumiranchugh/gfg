import request from "request";
import fs from "fs";
import path from "path";
import { elasticIP, elasticProductIP } from "../config";

export const hitElastic = (queryClause, ip) => {
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
        resolve(body.hits);
      }
    });
  });
};

/**
 * ignore this method. Oly for loading data
 * @param {*} mapping
 * @param {*} filename
 */
export const initDB = async (mapping, filename) => {
  const file = path.join(__dirname, "..", "initscripts", mapping);
  const result = await hitElastic(
    JSON.parse(fs.readFileSync(file, "utf8")),
    `${elasticIP}products_index`
  );
  if (result.acknowledged === true) {
    const req = request.post(elasticIP, (err, resp, body) => {
      if (err) {
        // console.log('Error!');
      } else {
        // console.log(`URL: ${body}`);
      }
    });
    req
      .form()
      .append(
        "file",
        fs.createReadStream(
          path.join(__dirname, "..", "initscripts", filename),
          "utf8"
        )
      );
  }
};
