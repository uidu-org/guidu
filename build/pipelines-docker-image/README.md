# Pipelines Docker Image (atlassianlabs/atlaskit-mk-2)

This docker image is used to set up Atlaskit builds in CI. It's primarily been put in place so that
we aren't reinstalling yarn every single build because it's become quite flakey (returning 520 errors from cloudflare).

We've kept it as light as possible by just extending from the `node:8.4.0` image, just as we used to.

Note that we are hosting this image on the public dockerhub, not our internal one because we need to access it from pipelines.

# Updating image

First you'll need a dockerhub account with access to the atlassianlabs repository (log in to https://hub.docker.com/ and check if you see it in the dropdown).

Now you can login to the registry

```
docker login
# enter name and password
```

You'll see a script in the `package.json` called `get-image-name` which is used to create the name of the image when creating and pushing (i.e `atlassianlabs/atlaskit-mk-2:1.0.1`). The tag (the `1.0.1` in this case) comes from this packages `package.json`. This must be manually bumped when creating a new version of the image. This allows you to test changes to the image in a pullrequest without updating it for everyone.

> Note: You'll need to bump the tag in `bitbucket-pipelines.yml` as well.


Once you've made your changes to the `Dockerfile` you can run

```
yarn build-image
```

to build the image and

```
yarn push-image
```

to push it to dockerhub. To test the changes, simply bump the tag in `bitbucket-pipelines.yml` and push a branch to Bitbucket.
