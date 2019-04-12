import * as tslib_1 from "tslib";
/* tslint:disable:no-console */
import { Router, Response, } from 'kakapo';
import * as uuid from 'uuid/v4';
import { mapDataUriToBlob } from '../../utils';
import { mockDataUri } from '../database/mockData';
import { createCollection, createCollectionItem, } from '../database';
import { defaultBaseUrl } from '../..';
import { createUpload } from '../database/upload';
var RouterWithLogging = /** @class */ (function (_super) {
    tslib_1.__extends(RouterWithLogging, _super);
    function RouterWithLogging(options) {
        return _super.call(this, options) || this;
    }
    RouterWithLogging.prototype.register = function (method, path, originalHandler) {
        var handler = function (request, database) {
            var response;
            var requestWithBodyObject;
            var error;
            try {
                response = originalHandler(request, database);
                var body = request.body;
                try {
                    body = JSON.parse(body);
                }
                catch (e) { }
                requestWithBodyObject = { request: tslib_1.__assign({}, request, { body: body }) };
            }
            catch (e) {
                error = e;
            }
            console.log({
                method: method,
                path: path,
                request: requestWithBodyObject,
                database: database,
                response: response,
                error: error,
            });
            if (error) {
                throw error;
            }
            else {
                return response;
            }
        };
        return _super.prototype.register.call(this, method, path, handler);
    };
    return RouterWithLogging;
}(Router));
export function createApiRouter() {
    var router = new RouterWithLogging({
        host: defaultBaseUrl,
        requestDelay: 10,
    });
    router.post('/collection', function (_a, database) {
        var body = _a.body;
        var name = JSON.parse(body).name;
        var collection = createCollection(name);
        database.push('collection', collection);
        return { data: collection };
    });
    router.post('/file/binary', function (_a, database) {
        var headers = _a.headers, body = _a.body, query = _a.query;
        var mimeType = headers["Content-Type"];
        var collection = query.collection, name = query.name, occurrenceKey = query.occurrenceKey;
        var item = createCollectionItem({
            collectionName: collection,
            name: name,
            mimeType: mimeType,
            occurrenceKey: occurrenceKey,
            blob: body,
        });
        database.push('collectionItem', item);
        return {
            data: item.details,
        };
    });
    router.get('/collection/:collectionName/items', function (_a, database) {
        var params = _a.params;
        var collectionName = params.collectionName;
        var contents = database
            .find('collectionItem', {
            collectionName: collectionName,
        })
            .map(function (record) { return record.data; });
        return {
            data: {
                nextInclusiveStartKey: Math.floor(Math.random() * 99999),
                contents: contents,
            },
        };
    });
    router.get('/file/:fileId/image', function (_a) {
        var query = _a.query;
        var width = query.width, height = query.height, _b = query["max-age"], maxAge = _b === void 0 ? 3600 : _b;
        var dataUri = mockDataUri(Number.parseInt(width, 10), Number.parseInt(height, 10));
        var blob = mapDataUriToBlob(dataUri);
        return new Response(200, blob, {
            'content-type': blob.type,
            'content-length': blob.size.toString(),
            'cache-control': "private, max-age=" + maxAge,
        });
    });
    router.get('/file/:fileId/image/metadata', function () {
        return {
            metadata: {
                pending: false,
                preview: {},
                original: {
                    height: 4096,
                    width: 4096,
                },
            },
        };
    });
    router.get('/picker/accounts', function () {
        return {
            data: [],
        };
    });
    router.head('/chunk/:chunkId', function (_a, database) {
        var params = _a.params;
        var chunkId = params.chunkId;
        if (database.findOne('chunk', { id: chunkId })) {
            return new Response(200, undefined, {});
        }
        else {
            return new Response(404, undefined, {});
        }
    });
    router.put('/chunk/:chunkId', function (_a, database) {
        var params = _a.params, body = _a.body;
        var chunkId = params.chunkId;
        database.push('chunk', {
            id: chunkId,
            blob: body,
        });
        return new Response(201, undefined, {});
    });
    router.post('/chunk/probe', function (_a, database) {
        var body = _a.body;
        var requestedChunks = body.chunks;
        var allChunks = database.all('chunk');
        var existingChunks = [];
        var nonExistingChunks = [];
        allChunks.forEach(function (_a) {
            var id = _a.data.id;
            if (requestedChunks.indexOf(id) > -1) {
                existingChunks.push(id);
            }
            else {
                nonExistingChunks.push(id);
            }
        });
        return new Response(200, {
            data: {
                results: tslib_1.__spread(existingChunks.map(function () { return ({ exists: true }); }), nonExistingChunks.map(function () { return ({ exists: false }); })),
            },
        }, {});
    });
    router.post('/upload', function (_a, database) {
        var query = _a.query;
        var _b = query.createUpTo, createUpTo = _b === void 0 ? '1' : _b;
        var records = database.create('upload', Number.parseInt(createUpTo, 10));
        var data = records.map(function (record) { return record.data; });
        return {
            data: data,
        };
    });
    router.put('/upload/:uploadId/chunks', function (_a, database) {
        var params = _a.params, body = _a.body;
        var uploadId = params.uploadId;
        var chunks = JSON.parse(body).chunks /*, offset*/;
        var record = database.findOne('upload', { id: uploadId });
        database.update('upload', record.id, {
            chunks: tslib_1.__spread(record.data.chunks, chunks),
        });
        return new Response(200, undefined, {});
    });
    router.post('/file', function (_a, database) {
        var query = _a.query;
        var collection = query.collection;
        var item = createCollectionItem({
            collectionName: collection,
        });
        database.push('collectionItem', item);
        return new Response(201, {
            data: {
                id: item.id,
                insertedAt: Date.now(),
            },
        }, {});
    });
    router.post('/file/upload', function (_a, database) {
        var query = _a.query, body = _a.body;
        var collection = query.collection;
        var _b = JSON.parse(body), name = _b.name, mimeType = _b.mimeType /*, uploadId*/;
        var record = database.push('collectionItem', createCollectionItem({
            name: name,
            mimeType: mimeType,
            collectionName: collection,
        }));
        return {
            data: tslib_1.__assign({}, record.data.details, { id: record.data.id }),
        };
    });
    router.get('/file/:fileId', function (_a, database) {
        var params = _a.params, query = _a.query;
        var fileId = params.fileId;
        var collection = query.collection;
        var record = database.findOne('collectionItem', {
            id: fileId,
            collectionName: collection,
        });
        if (record) {
            return {
                data: tslib_1.__assign({ id: fileId }, record.data.details),
            };
        }
        else {
            return new Response(404, undefined, {});
        }
    });
    router.post('/items', function (_a, database) {
        var body = _a.body;
        var descriptors = JSON.parse(body).descriptors;
        var records = descriptors.map(function (descriptor) {
            var record = database.findOne('collectionItem', {
                id: descriptor.id,
                collectionName: descriptor.collection,
            });
            if (record) {
                return {
                    type: 'file',
                    id: descriptor.id,
                    collection: descriptor.collection,
                    details: record.data.details,
                };
            }
            return null;
        });
        if (records.length) {
            return {
                data: {
                    items: records,
                },
            };
        }
        else {
            return new Response(404, undefined, {});
        }
    });
    router.post('/file/copy/withToken', function (request, database) {
        var body = request.body, query = request.query;
        var sourceFile = JSON.parse(body).sourceFile;
        var destinationCollection = query.collection, _a = query.replaceFileId, replaceFileId = _a === void 0 ? uuid() : _a, _b = query.occurrenceKey, occurrenceKey = _b === void 0 ? uuid() : _b;
        var sourceRecord = database.findOne('collectionItem', {
            id: sourceFile.id,
            collectionName: sourceFile.collection,
        });
        var _c = sourceRecord.data, details = _c.details, blob = _c.blob;
        var record = database.push('collectionItem', {
            id: replaceFileId,
            insertedAt: Date.now(),
            occurrenceKey: occurrenceKey,
            details: details,
            blob: blob,
            collectionName: destinationCollection,
        });
        return {
            data: record.data,
        };
    });
    router.post('/upload/createWithFiles', function (_a, database) {
        var body = _a.body;
        var descriptors = JSON.parse(body).descriptors;
        var descriptor = descriptors[0];
        database.push('collectionItem', createCollectionItem({
            id: descriptor.fileId,
            collectionName: descriptor.collection,
            occurrenceKey: descriptor.occurrenceKey,
        }));
        var uploadRecord = createUpload();
        database.push('upload', uploadRecord);
        return {
            data: {
                created: [
                    {
                        fileId: descriptor.fileId,
                        uploadId: uploadRecord.id,
                    },
                ],
            },
        };
    });
    return router;
}
//# sourceMappingURL=api-router.js.map