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

const main = async () => {
  const ora = (await import("ora")).default;

  const client = new Client()
    .setEndpoint(process.env.ENDPOINT)
    .setProject(process.env.PROJECT)
    .setKey(process.env.KEY);

  const functions = new Functions(client);

  let func = null;
  try {
    func = await functions.get(process.env.FUNCTION);
    console.log(`Found function ${process.env.FUNCTION}`);
  } catch (e) {
    console.log(`Error, function ${process.env.FUNCTION} not found`);
  }

  if (!func) {
    console.log(`Creating function ${process.env.FUNCTION}`);
    func = await functions.create(
      process.env.FUNCTION,
      process.env.FUNCTION,
      ["any"],
      process.env.RUNTIME
    );
  }

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

  let spinner = ora(
    `Creating deployment for function ${process.env.FUNCTION}`
  ).start();

  let deployment = await functions.createDeployment(
    func.$id,
    "index.js",
    InputFile.fromPath(path.join(__dirname, "code.tar.gz"), "code.tar.gz"),
    true
  );

  spinner.text = `Waiting for deployment ${deployment.$id} for function ${process.env.FUNCTION} to be ready`;
  // Wait for deployment to be ready
  while (deployment.status !== "ready") {
    deployment = await functions.getDeployment(func.$id, deployment.$id);
  }

  spinner.text = `Deployment ${deployment.$id} for function ${process.env.FUNCTION} is ready`;

  const { deployments } = await functions.listDeployments(func.$id);
  const oldDeployments = deployments.filter((d) => d.$id !== deployment.$id);
  for (const oldDeployment of oldDeployments) {
    spinner.text = `Deleting deployment ${oldDeployment.$id} for function ${process.env.FUNCTION}`;
    await functions.deleteDeployment(func.$id, oldDeployment.$id);
  }

  spinner.text = `Executing function ${process.env.FUNCTION}`;
  const { status, statusCode, response, duration } =
    await functions.createExecution(func.$id);

  spinner.stop();

  console.log(`### Deploy ###`);
  console.log("Endpoint: " + process.env.ENDPOINT);
  console.log(`Function: ${func.name} (${func.$id})`);
  console.log(`Deployment: ${deployment.$id}`);
  console.log(`Runtime: ${func.runtime}`);
  console.log(`\n### Execution ###`);
  console.log(`Execution status: ${status}`);
  console.log(`Execution status code: ${statusCode}`);
  console.log(`Execution response: ${response}`);
  console.log(`Execution duration: ${duration}`);
};

main();
