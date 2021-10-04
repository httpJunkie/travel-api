# Ottoman JS Resources

This repo is the working example from our demo at Couchbse Connect 2021 on OttomanJS and also contains resources for JavaScript developers using Couchbase and Ottoman.

## Setting up Couchbase Server (Document Database) Using Docker

The following shell command will setup a Couchbase Docker container with the name: cb using the official Couchbase Docker image.

```shell
docker pull couchbase
docker run -d --name cb -p 8091-8096:8091-8096 -p 11210-11211:11210-11211 couchbase
```

With your databse running locally you can access it at localhost:8091, set up a one node cluster:

1. Set Cluster Name (`Travel API`)
2. Set Admin User (`Administrator`)
3. Set Password (`password`)
4. Accept Terms
5. Configure Disk, Memory, Services (Check Data, Query, and Index at minimum)

Once logged in create a new bucket.

1. Select Bucket Tab
2. Click "ADD BUCKET"
3. Name your bucket `travel-api`

## Resources

- [OttomanJS.com](https://ottomanjs.com)
- [Introducing Ottoman v2.0](https://blog.couchbase.com/ottoman-2-0-odm-node-js-couchbase/)
- [A Better Developer Experience with OttomanJS](https://youtu.be/hHzr2UxLn8o?t=15607)
- [Couchbase Official Docker Image](https://hub.docker.com/_/couchbase)

## Official Demos

- [OttomanJS Official JavaScript Demo](https://github.com/couchbaselabs/try-ottoman)
- [OttomanJS Official TypeScript Demo](https://github.com/couchbaselabs/try-ottoman-ts)

## Speaker Details

- Eric Bishard ([@httpJunkie](https://twitter.com/httpjunkie))
- Arun Vijayraghavan ([@ArunVijayragha1](https://twitter.com/ArunVijayragha1))