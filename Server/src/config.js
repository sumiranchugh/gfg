// config.js
import dotenv from "dotenv";

dotenv.config();

export const elasticIP = process.env.ELASTIC_IP;
export const port = process.env.PORT;
export const logger = process.env.LOGGER;
export const showErr = process.env.SHOW_ERR || true;
export const elasticProductIP = `${process.env.ELASTIC_IP}products_index/_search?pretty`;
