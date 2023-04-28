const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

//run this first then comment out func call
async function uploadFile() {
    try {
        const f = await openai.createFile(
            fs.createReadStream("newdata.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
}
//uploadFile();

//run this 2nd, wait a bit, then comment out func call and move on
async function makeFineTune() {
    try {
        const ft = await openai.createFineTune({
            training_file: `file-Yg58oe0K0AY2GXdtq3lAbPZc`,
            model: 'davinci'
        });
        console.log(ft);
     }
    catch (err) {
        console.log('err makefinetune: ', err.response.data.error);
    }
}
//makeFineTune();

// 3. run,wait a bit, run again and get fine_tuned_model name
async function getFineTunedModelName() {
    try {
        const modelName = await openai.listFineTunes();
        console.log(`modelName ${JSON.stringify(modelName.data.data)}`);
    }
    catch (err) {
        console.log('err getmod: ', err)
    }
 }
//getFineTunedModelName();


async function run() {
    try {
        const comp = await openai.createCompletion({
            model: 'davinci:ft-personal-2023-04-28-05-07-33',
            prompt: `What is Lizzie Siegle's favorite food`,
            max_tokens: 200
        });
        if (comp.data) {
            console.log('choices: ', comp.data.choices)
        }
    } catch (err) {
        console.log('err: ', err)
    }
}
run();


