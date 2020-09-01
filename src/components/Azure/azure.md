# Set up CI/CD with Azure and GitHub under 10 minutes
### Learn how to speed up your project workflow in minutes.

![](https://miro.medium.com/max/700/1*U3lV0jl7VvGw2DJ5RrdeUw.png)

In this guide, I will run through the steps to help you set up a project workflow with Azure and Github using a React App. Before we start, let’s go over the basics and why we are doing this.

## What is CI/CD?
Continuous integration (CI) focuses on building and testing the new code changes.

Continuous delivery/deployment (CD) focuses on getting new changes ready for deployment in production.

![](https://miro.medium.com/max/700/1*gp5bu9joMOkCAkwRfXJA4w.png)

## Benefits of CI/CD
CI/CD can help teams speed up the deployment process, allowing developers to make small code changes to minimize bugs in production.

## (Optional) Step 0: Create a React App
If you already have an app ready, go to step 1.
```
npx create-react-app <project-name>
```

## Step 1: Setup CI/CD pipeline
If you are new to Azure, check out Microsoft's New User Guide; it explains the key concepts in Azure Pipeline.

Create an azure-pipeline.yml file in your project root directory. This file lists out the steps to build an artifact.

```
trigger:
 - master  
pool:
   vmImage: 'ubuntu-latest'
steps: 
  - task: NodeTool@0
    inputs:
     versionSpec: '10.x'
    displayName: 'Install Node.js'
  - script: |
     npm install
     npm run build
    displayName: 'npm install and build'
  - task: CopyFiles@2
    inputs:
     Contents: 'build/**' # Pull the build directory (React)
     TargetFolder: '$(Build.ArtifactStagingDirectory)'
  - task: PublishBuildArtifacts@1
    inputs:
      pathtoPublish: $(Build.ArtifactStagingDirectory) 
      ArtifactName: 'www' # output artifact named www
```

Push up the azure-pipeline.yml file to GitHub and continue.

## Step 2: Setup project
Go to portal.azure.com and then go to Azure DevOps organizations.

![](https://miro.medium.com/max/465/1*HPu9U8410Su3B9VM4XwoXw.png)

If you are new to Azure, you need to set up a new organization before setting up a project. Click on the ‘Create new organization’ button on the top right corner.

![](https://miro.medium.com/max/486/1*MUmPR02FMNDMIjC4BUY4Ig.png)

Once you created a new organization, select a ‘New Project’ and fill out the project details. Then you should see the project homepage.

![](https://miro.medium.com/max/700/1*2gdEmTFlxyah0aNS0FlDLA.png)

Go to ‘Pipelines’ and select ‘Create Pipeline.’ First, we need to connect the codebase, so select ‘GitHub.’

![](https://miro.medium.com/max/687/1*k80yByVlK5OGZj-aQ2ISvw.png)

Once you select GitHub, you should be directed to a GitHub page for authentication and approval. Make sure you grant Azure access to the correct repo.

![](https://miro.medium.com/max/700/1*-NVgauwMOHjQMZC7zj7hhg.png)

Next, we need to configure the CI/CD pipeline. Select ‘Existing Azure Pipelines YAML File.’

![](https://miro.medium.com/max/639/1*OnC5pNFugLdVd0z_cBHWLg.png)

Use the azure-pipeline.yml file.

![](https://miro.medium.com/max/467/1*w4FxRFdfCnA8cSCOoHkLwg.png)

Then, run your pipeline to create an artifact and go to jobs to see a realtime build.

![](https://miro.medium.com/max/700/1*DvhzAXApYI4KVngdoQ_VjQ.png)

## Step 3: Set up App Service
Navigate back to the portal and go to App Services to set up the project URL.

![](https://miro.medium.com/max/386/1*ISVvfXAGPwblX79mIqu4iQ.png)

Click on ‘Add’ and fill in the project details. Here is a basic web app set up.

![](https://miro.medium.com/max/700/1*GdP1x0UA4NC_9piXYX5qXg.png)

If you don't have a resource group, go to the search bar and lookup ‘Resource Group’ and create a basic group like the screenshot below.

![](https://miro.medium.com/max/700/1*LFUupPcRm4iQp1nMHScG4w.png)

The same goes for Windows Plan, lookup ‘App Service Plan,’ and create a plan.

![](https://miro.medium.com/max/700/1*yxOLIcBJzFGmIG0PvrF-pw.png)

## Step 4: Create a release pipeline
Now go back to the project homepage and select ‘Releases’ under the pipeline tab.

![](https://miro.medium.com/max/600/1*SnFESLMTCTXKjwNNzfmIjQ.png)

Apply ‘Azure App Service deployment’ and then select ‘Add an artifact.’

![](https://miro.medium.com/max/603/1*ndTBGiSk0nTTgTRUpqp6WA.png)

Now we need to add a deployment trigger. In this guide, the trigger is set on the master branch. So whenever new code gets pushed to master, a new build will start. Click on the lightning bolt next to the article to enable the trigger.

![](https://miro.medium.com/max/568/1*W7YUc3u3VgUkjkOvp6Zrvw.png)

The pipeline should look like this.

![](https://miro.medium.com/max/668/1*pmyanKfZTxMrK8gKSWdhYw.png)

Go the ‘Tasks’ tab to select the correct subscription and app service name.

![](https://miro.medium.com/max/700/1*o1Me_nMD8qj6NaFj4AO0-g.png)

Select ‘Deploy Azure App Service’ and go to ‘Package or folder.’ Replace the original path with the following.
```
$(System.DefaultWorkingDirectory)/<sourcec-alias>/www/build
```

For example, it should look like this.

![](https://miro.medium.com/max/637/1*xJtJRwBwDcGEEOT-JWAUoQ.png)

## Step 5: Test CI/CD
To test your CI/CD pipeline, make some changes to the app and push up the code. Once you do, go to the repo on GitHub, you should see a yellow dot next to the commit hash.

![](https://miro.medium.com/max/543/1*cb6Q8Q0IMltaPH55twwb4A.png)

Once the build is complete, it should trigger the release pipeline. Go to ‘Releases,’ and you should see the release progress in realtime.

![](https://miro.medium.com/max/700/1*mn_fqjXo5CjLiUCD9hZ6CQ.png)

To view the website, go to <web-app-name>.azurewebsites.net
The web-app-name is the name from the create web app page.

## References
1. [Azure Pipeline Docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/javascript?view=azure-devops&tabs=code)
2. [Building and Deploying your Code with Azure Pipelines](https://www.youtube.com/watch?v=NuYDAs3kNV8) by Microsoft Visual Studio