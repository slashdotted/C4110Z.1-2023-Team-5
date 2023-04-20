require("dotenv").config();
const path = require("path");
const tar = require("tar");
const { Client, Functions, InputFile } = require("node-appwrite");

if (!process.env.ENDPOINT) {
  throw new Error("Missing ENDPOINT environment variable");
}

if (!process.env.PROJECT) {
  throw new Error("Missing PROJECT environment variable");
}

if (!process.env.KEY) {
  throw new Error("Missing KEY environment variable");
}

if (!process.env.FUNCTION) {
  throw new Error("Missing FUNCTION environment variable");
}

if (!process.env.RUNTIME) {
  throw new Error("Missing RUNTIME environment variable");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const originalConsoleLog = console.log;
console.log = (...args) => {
  originalConsoleLog(`[${new Date().toLocaleString()}]`, ...args);
};

const main = async () => {
  const ora = (await import("ora")).default;

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.KEY);

  const functions = new Functions(client);
  try {
    let func = await functions.get(process.env.FUNCTION);
    console.log(`Deleting function ${process.env.FUNCTION} (${func.$id})`);
    await functions.delete(func.$id);
    // Wait for function to be deleted
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (e) {}

  console.log(`Creating function ${process.env.FUNCTION}`);
  const func = await functions.create(
    process.env.FUNCTION,
    process.env.FUNCTION,
    ["any"],
    process.env.RUNTIME,
    undefined,
    undefined,
    900,
    true
  );
  console.log(`Created function ${process.env.FUNCTION} (${func.$id})`);

  console.log(`Creating variable OPENAI_API_KEY`);
  const variable = await functions.createVariable(
    func.$id,
    "OPENAI_API_KEY",
    process.env.OPENAI_API_KEY
  );
  console.log(`Created variable ${variable.key}`);

  console.log(`Creating zip of function directory`);
  // Create tar of function directory
  await tar.create(
    {
      gzip: true,
      sync: true,
      cwd: path.join(__dirname, "function"),
      file: path.join(__dirname, "code.tar.gz"),
    },
    ["."]
  );

  let deployment = await functions.createDeployment(
    func.$id,
    "index.js",
    InputFile.fromPath(path.join(__dirname, "code.tar.gz"), "code.tar.gz"),
    true
  );

  console.log(
    `Created deployment ${deployment.$id} for function ${func.name} (${func.$id})`
  );

  let spinner = ora(`Please wait...`).start();
  // Wait for deployment to be ready
  while (deployment.status !== "ready") {
    deployment = await functions.getDeployment(func.$id, deployment.$id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    spinner.text = `Waiting for deployment ${deployment.$id} for function ${process.env.FUNCTION} to be ready, current status: ${deployment.status}\n\nBuild stdout:\n${deployment.buildStdout}\n\nBuild stderr:\n${deployment.buildStderr}`;
  }
  spinner.stop();

  console.log(
    `Deployment ${deployment.$id} for function ${func.name} (${func.$id}) is ready!`
  );
  console.log(deployment.buildStderr);

  const ingredients = ["Pasta", "Tomato Sauce", "Tuna"];

  console.log(
    `Executing function ${func.name} (${
      func.$id
    }), ingredients: ${ingredients.join(",")}`
  );

  const request = await fetch(
    `https://appwrite-didattica.supsi.ch/v1/functions/openai-recipes/executions`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-appwrite-project": process.env.PROJECT,
      },
      body: JSON.stringify({
        data: JSON.stringify({
          ingredients,
          measurementSystem: "metric",
          language: "ITALIANO",
        }),
      }),
    }
  );

  const { status, statusCode, duration, stderr, stdout, response } =
    await request.json();

  console.log(`### Deploy ###`);
  console.log("Endpoint: " + process.env.ENDPOINT);
  console.log(`Function: ${func.name} (${func.$id})`);
  console.log(`Deployment: ${deployment.$id}`);
  console.log(`Runtime: ${func.runtime}`);
  console.log(`\n### Execution ###`);
  console.log(`Execution status: ${status}`);
  console.log(`Execution status code: ${statusCode}`);
  console.log(`Execution response: `, response);
  console.log(`Execution duration: ${duration}`);
  console.log(`Execution stderr:\n${stderr}`);
  console.log(`Execution stdout:\n${stdout}`);
};

main();
