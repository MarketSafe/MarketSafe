const express = require("express");

const router = express.Router();

const AWS = require("aws-sdk");
const csv = require("csv-parser");
require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
});

AWS.config.update({
    region: "us-east-1"
});

const s3 = new AWS.S3();

const listObjects = async (nomeBucket) => {
    try {
        const params = {
            Bucket: nomeBucket
        };

        const data = await s3.listObjectsV2(params).promise();
        console.log("Objects in S3 bucket:");
        data.Contents.forEach((obj) => {
            console.log(obj.key);
        });
    } catch(err) {
        console.log("Error accessing buckets: ", err)
    }
};

const readFileCsv = async (fileName, nomeBucket) => {
    return new Promise((resolve, reject) => {
        const results = [];

        const params = {
            Bucket: nomeBucket,
            Key: fileName,
        };

        const s3Stream = s3.getObject(params).createReadStream();

        s3Stream
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("end", () => {
                console.log("CSV file processed successfully.");
                resolve(results);
            })
            .on("error", (err) => {
                console.error("Error reading CSV: ", err);
                reject(err);
            });
    });
};

const processCSV = async () => {
    console.log('/////////////////////Chamando função processar arquivos CSV////////////////////////////');

    try {
        const fileName = "crawler.csv";
        const nomeBucket = "s3-trusted-mktsf";

        var csvData = await readFileCsv(fileName, nomeBucket);
        return csvData;
    } catch (err) {
        console.error("Error processing CSV: ", err);
    }
};

router.get("/viewCrawler", async(req, res) => {
    try {
        const resultado = await processCSV();
        res.json({
            resultado
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro interno do servidor"
        })
    }
});

module.exports = router;