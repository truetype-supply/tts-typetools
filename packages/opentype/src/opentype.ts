import parseBuffer from "./utils/parseBuffer";
// import { nodeBufferToArrayBuffer } from "./utils/util";

// const loadFromFile = (path: string, callback: Function) => {
//     const fs = require("fs");
//     // import("fs").then((fs) =>
//     //     fs.readFile(path, (err, buffer) => {
//     //         if (err) {
//     //             return callback(err);
//     //         }
//     //         return callback(null, nodeBufferToArrayBuffer(buffer));
//     //     })
//     // );
// };

function loadFromUrl(url: string, callback: Function) {
    const request = new XMLHttpRequest();
    request.open("get", url, true);
    request.responseType = "arraybuffer";
    request.onload = () => {
        if (request.response) {
            return callback(null, request.response);
        } else {
            return callback(`Font couldn't be loaded: ${request.statusText}`);
        }
    };
    request.onerror = () => {
        callback(`Font couldn't be loaded`);
    };

    request.send();
}

function load(url: string, callback?: Function, opt?: any) {
    const isNode = typeof window === "undefined";
    // const loadFn = isNode && !opt.isUrl ? loadFromFile : loadFromUrl;
    const loadFn = loadFromUrl;

    return new Promise((resolve, reject) => {
        loadFn(url, (err: Error, arrayBuffer: ArrayBuffer) => {
            if (err) {
                callback ? callback(err) : reject(err);
            }

            let font: any;
            try {
                font = parseBuffer(arrayBuffer, opt);
            } catch (e) {
                callback ? callback(e, null) : reject(e);
            }

            callback ? callback(null, font) : resolve(font);
        });
    });
}

export { load };
