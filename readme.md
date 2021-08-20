# Ottoman JS Resources

This repo has the entire example from our demo at JS & Friends and also contains resources for JavaScript developers using Couchbase and Ottoman.

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

## Learning Videos About JSON Data Modeling

- [v1.ottomanjs.com](https://v1.ottomanjs.com)
- [v2.ottomanjs.com (latest in beta)](https://v2.ottomanjs.com)
- [Couchbase Official Docker Image](https://hub.docker.com/_/couchbase)
- [JSON Data Modeling Resources](https://github.com/httpJunkie/node-cb-data-models/blob/master/readme.md)

