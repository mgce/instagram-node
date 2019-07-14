const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');

// https://github.com/shelljs/shelljs/issues/469
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

const PROTO_DIR = path.join(__dirname, '../protos');
const MODEL_DIR = path.join(__dirname, '../protos/models');
const PROTOC_GEN_TS_PATH = path.join(__dirname, '../node_modules/.bin/protoc-gen-ts.cmd');
// const PROTOC_GEN_GRPC_TOOLS_TS_PATH = path.join(__dirname, '../../../node_modules/grpc-tools/bin/grpc_node_plugin.exe');
const PROTOC_GEN_GRPC_TOOLS_TS_PATH = path.join(__dirname, '../../../node_modules/.bin/grpc_tools_node_protoc_plugin.cmd');

rimraf.sync(`${MODEL_DIR}/*`);

// https://github.com/agreatfool/grpc_tools_node_protoc_ts/tree/master/examples

 shell.exec(`grpc_tools_node_protoc `
  + ` --plugin=protoc-gen-grps=${PROTOC_GEN_GRPC_TOOLS_TS_PATH} `
  + ` --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} `
  + ` --grpc_out=${MODEL_DIR} `
  + ` --js_out=import_style=commonjs,binary:${MODEL_DIR} `
  + ` --ts_out=${MODEL_DIR} `
  + ` -I ${PROTO_DIR}`
  + ` ${PROTO_DIR}\\user.proto`
  + ` ${PROTO_DIR}\\common.proto`
  + ` ${PROTO_DIR}\\image.proto`
  + ` ${PROTO_DIR}\\comment.proto`
  + ` ${PROTO_DIR}\\postLike.proto`
  + ` ${PROTO_DIR}\\userFollow.proto`
  +`  ${PROTO_DIR}\\post.proto`);

// shell.exec(`grpc_tools_node_protoc `
// + ` --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} `
// + ` -I ${PROTO_DIR}`
//   + ` ${PROTO_DIR}\\user.proto`
//   + ` ${PROTO_DIR}\\common.proto`
//   + ` ${PROTO_DIR}\\image.proto`
//   +`  ${PROTO_DIR}\\post.proto`);

// shell.exec(`protoc`
// + ` --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH}`
// + ` --grpc_out="${MODEL_DIR}" `
// + ` --ts_out=${MODEL_DIR}`
// + ` --js_out=import_style=commonjs,binary:${MODEL_DIR}`
// + ` -I ${PROTO_DIR}`
// + ` ${PROTO_DIR}\\user.proto`
// + ` ${PROTO_DIR}\\common.proto `
// + ` ${PROTO_DIR}\\image.proto `
// + ` ${PROTO_DIR}\\post.proto `
// )


//   shell.exec(`grpc_tools_node_protoc `
//   + `--js_out="import_style=commonjs,binary:${MODEL_DIR}" `
//   + `--grpc_out="${MODEL_DIR}" `
//   + `--plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_TOOLS_TS_PATH} `
//   + `-I ${PROTO_DIR} `
//   +` ${PROTO_DIR}/user.proto`
//   +` ${PROTO_DIR}/common.proto`
//   +` ${PROTO_DIR}/image.proto`
//   +` ${PROTO_DIR}/post.proto`);

// shell.exec(`grpc_tools_node_protoc  `
// +`--plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" `
// +`--js_out="import_style=commonjs,binary:${MODEL_DIR}" `
// + `--ts_out="${MODEL_DIR}" `
// + `-I ${PROTO_DIR} `
// + `${PROTO_DIR}/user.proto `
// + `${PROTO_DIR}/common.proto `
// + `${PROTO_DIR}/image.proto `
// + `${PROTO_DIR}/post.proto `)



// https://github.com/dcodeIO/protobuf.js#command-line
// https://github.com/dcodeIO/protobuf.js#command-line-api
