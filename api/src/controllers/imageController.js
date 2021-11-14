// Google Cloud Vision
const vision = require('@google-cloud/vision');
const { GoogleAuth, grpc } = require('google-gax');

// Translate API
const translate = require("translate");
translate.engine = "google";

function getApiKeyCredentials(apiKey) {
    const sslCreds = grpc.credentials.createSsl();
    const googleAuth = new GoogleAuth();
    const authClient = googleAuth.fromAPIKey(apiKey);
    const credentials = grpc.credentials.combineChannelCredentials(
        sslCreds,
        grpc.credentials.createFromGoogleCredential(authClient)
    );
    return credentials;
}

// Function to find labels of an image (using Google's API)
async function findLabels(url, apiKey) {
    const sslCreds = getApiKeyCredentials(apiKey);
    // Client instance
    const client = new vision.ImageAnnotatorClient({ sslCreds });

    // Request on Google's API
    const [result] = await client.labelDetection(url);
    const labels = result.labelAnnotations;

    return labels;
}

// Function to translate sentences to desired language
async function translateSentence(sentence, captionLanguage) {
    return await translate(sentence, captionLanguage);
}

// Request handler
exports.post = async(req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Getting parameters from request body
        let imageUrl = req.body.url;
        let apiKey = req.body.key;
        translate.key = apiKey;
        let captionLanguage = req.body.language ? req.body.language : "pt";
        let useGoogleVision = req.body.vision;
        let currentCaption = req.body.caption;

        // Getting labels from Google's Vision API
        let labels = [];
        if (useGoogleVision) {
            labels = await findLabels(imageUrl, apiKey);
        }

        // Getting translated caption
        let caption = "WARD: Não foi possível descrever a imagem.";
        if (labels.length > 0) {
            caption = await translateSentence(currentCaption + "... WARD: A imagem pode conter os seguintes elementos: ", captionLanguage);
            await labels.reduce(async(memo, label) => {
                await memo;
                caption += " " + await translateSentence(label.description, captionLanguage) + ",";
            }, undefined);
        } else {
            caption = await translateSentence(currentCaption, captionLanguage);
        }

        // Returning result to client
        res.status(200).send({
            status: true,
            message: "Requisição feita com sucesso",
            caption: caption,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Ocorreu um erro ao executar a função: " + error,
        });
    }
};