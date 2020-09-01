# Set up CI/CD with Firebase(GCP) and GitHub in 10 minutes

Wanna learn how to automate your deployment workflow? Then look no further. In this guide, I will go over the steps to setup CI/CD with Firebase on the Google Cloud Platform (GCP).

## But first, why?
When you work on a team, new features are continually getting implemented. Once the features are implemented, it needs to be tested, deployed, and released. Moving your app from a local environment to a production environment requires many steps. But, there is a way to automate these steps. This is where Continuous Integration (CI) and Continuous Deployment (CD) come in. Adopting CI/CD can help teams to catch bugs early on.

## What is Continuous Integration (CI) and Continuous Deployment (CD)?
Continuous integration can allow developers to push up the changes to a shared repository. Tests can be put in place to make sure the code is ready for the next stage.

Continuous deployment is a process when new code changes get pushed to a staging environment before moving it to production.

## Step 0: Create a React App (Optional)
If you already have an app ready, proceed to step 1.
Run the following command to create and start an app called cicd-demo.

```
npx create-react-app cicd-demo
npm start
```

You should see a page like this.

![](https://miro.medium.com/max/700/1*Q0cuDFFWnTRFRca9U-PU8A.png)

## Step 1: Create a Firebase project
If you have an existing firebase project, go to step 2.

Go to firebase.google.com and go to the console to create a new project. By creating a new project in Firebase, the same project will also appear in the GCP console. For this guide, I created a project called CICD-Demo to go through the steps.

![](https://miro.medium.com/max/466/1*_FgCsAW1StO234oI45efAg.png)

Once you created a project, you should be directed to the project homepage.

![](https://miro.medium.com/max/700/1*IYClnJuGXbYO16v0-MaBuw.png)

## Step 2: Setup continuous deployment
In your project root directory, create a cloudbuild.yaml file. The purpose of this file is to list the necessary steps to get the app build.

```
steps:
      # Install
      - name: 'gcr.io/cloud-builders/npm'
        args: ['install']
      # Build
      - name: 'gcr.io/cloud-builders/npm'
        args: ['run', 'build']
      # Deploy
      - name: gcr.io/project-id/firebase
        args: ['deploy', '--project=project-id', '--only=hosting']
```

## Step 3: Link app to Firebase
Install Firebase CLI and log in.

```
npm install -g firebase-tools
firebase login
```

After you authenticate, you need to initialize your project.

```
firebase init
```

Make sure you select ‘Use an existing project’ because we already created a project in the Firebase console.

![](https://miro.medium.com/max/554/1*kmrlr31k8ZnxdKCKpPhUwA.png)

Since this is a React App, change “public” to “build” in the firebase.json file.
```
"public": "build"
```

## Step 4: Setup GCP Project
Go to console.cloud.google.com and select the correct project in the top left corner if you have multiple projects.

![](https://miro.medium.com/max/700/1*pZO0sqKdo7FYIfFG5hQ9uA.png)

Open up the sidebar and go to Cloud Build. Enable the Cloud Build API.

![](https://miro.medium.com/max/380/1*eH0EUJS4AYGPiJcOaJguYA.png)

If you are new to GCP, you might need to add a billing account. Go to the Billing tab located on the sidebar to set up an account.

![](https://miro.medium.com/max/559/1*tklWT2Ou3q3H-8BOO0ND7A.png)

## Step 5: Create a trigger
Creating a trigger will automatically start a build when you push to a branch. In the Cloud Build tab, select Trigger to start the process.

![](https://miro.medium.com/max/502/1*YxciGHxm2aoefO0yyzjoAA.png)

Select Github as your source.

![](https://miro.medium.com/max/467/1*RB1L4q1vqojN75b8Oq0w5A.png)

A new window should pop up for you to authenticate your GitHub account. Once you do, select the correct repository and continue.

![](https://miro.medium.com/max/479/1*25Kby4A0lNp2A-1dBKYdFA.png)

Then select ‘Create push trigger,’ you should see a trigger page like this. This trigger will start a build when there is a push to any branch.

![](https://miro.medium.com/max/689/1*9ZmNipu1deG129AnEpxNkg.png)

(Optional) If you want to limit the trigger to only the master branch, click on the default-push-trigger-1 to edit.

![](https://miro.medium.com/max/540/1*f3jrE-tsuRkmsqwcsAVLdg.png)

## Step 6: Install gcloud SDK
Go to cloud.google.com/sdk to install gcloud SDK and then initialize it.
```
gcloud init
```

Login with your account and select the correct project. This will make sure an image is created for the right project in the next step.

![](https://miro.medium.com/max/581/1*RQTrD9OyWAy9xzatSf8FDQ.png)

## Step 7: Setup Cloud Builder Community
Since we are using Firebase, Cloud Build doesn’t have the right image. So we need to use an image from the cloud builder community.
Go to github.com/GoogleCloudPlatform/cloud-builders-community and clone the repo. Make sure you clone the repo to your root directory. Then, navigate to the firebase folder and open up the Dockerfile.

Replace the contents in the Dockerfile with the following steps
```
FROM node
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install dos2unix
RUN echo "Installing firebase tools ..."
RUN npm i -g firebase-tools
ADD firebase.bash /usr/bin
RUN chmod +x /usr/bin/firebase.bash
RUN dos2unix /usr/bin/firebase.bash
ENTRYPOINT [ "/usr/bin/firebase.bash" ]
```

The original contents in the Cloud Builder Community Dockerfile will result in the following error because of the file format. To fix it, install dos2unix.

![](https://miro.medium.com/max/700/1*30IpQlEHthfa85TFB6rj2Q.png)

Then build the image. The output should end with ‘SUCCESS.’
```
gcloud builds submit .
```

## Step 8: Configure permissions
Now that the CI/CD pipeline is set up, we need to give a service account permissions for Firebase deployments. Go to the GCP sidebar and the IAM & Admin tab, find the member that ends in cloudbuild.gserviceaccount.com. Then go to edit to add another role called ‘Firebase Admin.’ If your app uses an API, you have to add API Keys Admin.

![](https://miro.medium.com/max/247/1*9_3oJx57aHDnNBz5D5YEMA.png)

## Step 9: Push to GitHub
Create a GitHub repository and push up your code if you haven’t done it already.
```
git add --all
git commit -m 'initial commit'
git push
```
## Step 10: Test CI/CD pipeline
To test your CI/CD pipeline, make some changes to your project and push up the code. Once you push up the changes, go to GitHub, and you should see a yellow dot next to the commit. This indicates that build is in progress. You can click the build logs by going to details, leading you to the cloud build history.

![](https://miro.medium.com/max/544/1*Hl4RalBEYTCZ-waJ5NvsbA.png)

![](https://miro.medium.com/max/700/1*UmI9CpiDHhevHmy8IZtCQg.png)

## References
1. [CI/CD tutorial](https://www.youtube.com/watch?v=Zd014DjonqE) by Fireship
2. https://cloud.google.com/cloud-build/docs/deploying-builds/deploy-firebase
3. https://cloud.google.com/sdk/docs/quickstart-windows