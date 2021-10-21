// Google Cloud Vision
const vision = require('@google-cloud/vision');

// Translate API
const translate = require("translate");
translate.engine = "google";
translate.key = "AIzaSyBr6e2QmvLnuSbHcmimFdjQeu8MeSrpiGA";

// Function to find labels of an image (using Google's API)
async function findLabels(url) {
    // Client instance
    const client = new vision.ImageAnnotatorClient();

    // Request on Google's API
    const [result] = await client.labelDetection(url);
    const labels = result.labelAnnotations;

    return labels;
}

// Function to translate sentences to desired language
async function translateSentence(sentence, captionLanguage) {
    return sentence;
    return await translate(sentence, captionLanguage);
}

// Request handler
exports.post = async (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Getting parameters from request body
        let imageUrl = req.body.url;
        let captionLanguage = req.body.language ? req.body.language : "pt";

        // Getting labels from Google's Vision API
        let labels = await findLabels(imageUrl);

        // Getting translated caption
        let caption = "WARD: Não foi possível descrever a imagem.";
        if (labels.length > 0) {
            caption = await translateSentence("WARD: A imagem pode conter os seguintes elementos: ", captionLanguage);
            await labels.reduce(async (memo, label) => {
                await memo;
                caption += " " + await translateSentence(label.description, captionLanguage) + ",";
            }, undefined);
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