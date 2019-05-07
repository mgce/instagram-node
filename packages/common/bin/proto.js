const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');

// https://github.com/shelljs/shelljs/issues/469
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

const PROTO_DIR = path.join(__dirname, '../src/protos');
const MODEL_DIR = path.join(__dirname, '../src/protos/models');
const PROTOC_GEN_TS_PATH = path.join(__dirname, '../node_modules/.bin/protoc-gen-ts.cmd');

rimraf.sync(`${MODEL_DIR}/*`);

// https://github.com/agreatfool/grpc_tools_node_protoc_ts/tree/master/examples

shell.exec('grpc_tools_node_protoc '
  + `--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" `
  + `--grpc_out="${MODEL_DIR}" `
  + `--js_out="import_style=commonjs,binary:${MODEL_DIR}" `
  + `--ts_out="${MODEL_DIR}" `
  + `-I ${PROTO_DIR} ${PROTO_DIR}/user.proto`);

/*
  shell.exec('grpc_tools_node_protoc '
  + `--js_out="import_style=commonjs,binary:${MODEL_DIR}" `
  + `--grpc_out="${MODEL_DIR}" `
  + '--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` '
  + `--proto_path ${PROTO_DIR} ${PROTO_DIR}\\user.proto`);

  shell.exec('grpc_tools_node_protoc '
  + `--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" `
  + `--ts_out="${MODEL_DIR}" `
  + `--proto_path ${PROTO_DIR} ${PROTO_DIR}\\user.proto`);
*/
// https://github.com/dcodeIO/protobuf.js#command-line
// https://github.com/dcodeIO/protobuf.js#command-line-api
