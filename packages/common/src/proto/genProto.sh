
# It must be a relative path to the protoc-gen-ts
# Path to this plugin 
PROTOC_GEN_TS_PATH="D:\repositories\instagram-node\node_modules\.bin\protoc-gen-ts.cmd"
# Directory to write generated code to (.js and .d.ts files) 
OUT_DIR="."
 
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=true:${OUT_DIR}" \
    ./user-service/model/*.proto