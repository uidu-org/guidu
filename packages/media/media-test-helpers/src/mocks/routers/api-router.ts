/* tslint:disable:no-console */
import {
  Router,
  Response,
  Request,
  Record,
  RouterOptions,
  RequestHandler,
  Database,
} from 'kakapo';
import { TouchFileDescriptor } from '@uidu/media-store';
import uuid from 'uuid/v4';

import { mapDataUriToBlob } from '../../utils';
import { mockDataUri } from '../database/mockData';
import {
  DatabaseSchema,
  createCollection,
  createCollectionItem,
} from '../database';
import { defaultBaseUrl } from '../..';
import { Chunk } from '../database/chunk';
import { createUpload } from '../database/upload';

class RouterWithLogging<M extends DatabaseSchema> extends Router<M> {
  constructor(options?: RouterOptions) {
    super(options);
  }

  register(method: string, path: string, originalHandler: RequestHandler<M>) {
    const handler: RequestHandler<M> = (
      request: Request,
      database: Database<M>,
    ) => {
      let response: Response;
      let requestWithBodyObject: any;
      let error: any;

      try {
        response = originalHandler(request, database);
        let body = request.body;
        try {
          body = JSON.parse(body);
        } catch (e) {}
        requestWithBodyObject = { request: { ...request, body } };
      } catch (e) {
        error = e;
      }

      console.log({
        method,
        path,
        request: requestWithBodyObject,
        database,
        response: response!,
        error,
      });

      if (error) {
        throw error;
      } else {
        return response!;
      }
    };
    return super.register(method, path, handler);
  }
}

export function createApiRouter(): Router<DatabaseSchema> {
  const router = new RouterWithLogging<DatabaseSchema>({
    host: defaultBaseUrl,
    requestDelay: 10,
  });

  router.post('/collection', ({ body }, database) => {
    const { name } = JSON.parse(body);
    const collection = createCollection(name);
    database.push('collection', collection);
    return { data: collection };
  });

  router.post('/file/binary', ({ headers, body, query }, database) => {
    const { 'Content-Type': mimeType } = headers;
    const { collection, name, occurrenceKey } = query;
    const item = createCollectionItem({
      collectionName: collection,
      name,
      mimeType,
      occurrenceKey,
      blob: body,
    });

    database.push('collectionItem', item);

    return {
      data: item.details,
    };
  });

  router.get('/collection/:collectionName/items', ({ params }, database) => {
    const { collectionName } = params;
    const contents = database
      .find('collectionItem', {
        collectionName,
      })
      .map(record => record.data);
    return {
      data: {
        nextInclusiveStartKey: Math.floor(Math.random() * 99999),
        contents,
      },
    };
  });

  router.get('/file/:fileId/image', ({ query }) => {
    const { width, height, 'max-age': maxAge = 3600 } = query;
    const dataUri = mockDataUri(
      Number.parseInt(width, 10),
      Number.parseInt(height, 10),
    );

    const blob = mapDataUriToBlob(dataUri);

    return new Response(200, blob, {
      'content-type': blob.type,
      'content-length': blob.size.toString(),
      'cache-control': `private, max-age=${maxAge}`,
    });
  });

  router.get('/file/:fileId/image/metadata', () => {
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

  router.get('/picker/accounts', () => {
    return {
      data: [],
    };
  });

  router.head('/chunk/:chunkId', ({ params }, database) => {
    const { chunkId } = params;
    if (database.findOne('chunk', { id: chunkId })) {
      return new Response(200, undefined, {});
    } else {
      return new Response(404, undefined, {});
    }
  });

  router.put('/chunk/:chunkId', ({ params, body }, database) => {
    const { chunkId } = params;

    database.push('chunk', {
      id: chunkId,
      blob: body,
    });

    return new Response(201, undefined, {});
  });

  router.post('/chunk/probe', ({ body }, database) => {
    const requestedChunks = body.chunks;
    const allChunks: Record<Chunk>[] = database.all('chunk') as any;
    const existingChunks: string[] = [];
    const nonExistingChunks: string[] = [];

    allChunks.forEach(({ data: { id } }) => {
      if (requestedChunks.indexOf(id) > -1) {
        existingChunks.push(id);
      } else {
        nonExistingChunks.push(id);
      }
    });

    return new Response(
      200,
      {
        data: {
          results: [
            ...existingChunks.map(() => ({ exists: true })),
            ...nonExistingChunks.map(() => ({ exists: false })),
          ],
        },
      },
      {},
    );
  });

  router.post('/upload', ({ query }, database) => {
    const { createUpTo = '1' } = query;

    const records = database.create('upload', Number.parseInt(createUpTo, 10));
    const data = records.map(record => record.data);

    return {
      data,
    };
  });

  router.put('/upload/:uploadId/chunks', ({ params, body }, database) => {
    const { uploadId } = params;
    const { chunks /*, offset*/ } = JSON.parse(body);

    const record = database.findOne('upload', { id: uploadId });

    database.update('upload', record.id, {
      chunks: [...record.data.chunks, ...chunks],
    });

    return new Response(200, undefined, {});
  });

  router.post('/file', ({ query }, database) => {
    const { collection } = query;
    const item = createCollectionItem({
      collectionName: collection,
    });
    database.push('collectionItem', item);
    return new Response(
      201,
      {
        data: {
          id: item.id,
          insertedAt: Date.now(),
        },
      },
      {},
    );
  });

  router.post('/file/upload', ({ query, body }, database) => {
    const { collection } = query;
    const { name, mimeType /*, uploadId*/ } = JSON.parse(body);

    const record = database.push(
      'collectionItem',
      createCollectionItem({
        name,
        mimeType,
        collectionName: collection,
      }),
    );

    return {
      data: {
        ...record.data.details,
        id: record.data.id,
      },
    };
  });

  router.get('/file/:fileId', ({ params, query }, database) => {
    const { fileId } = params;
    const { collection } = query;

    const record = database.findOne('collectionItem', {
      id: fileId,
      collectionName: collection,
    });

    if (record) {
      return {
        data: {
          id: fileId,
          ...record.data.details,
        },
      };
    } else {
      return new Response(404, undefined, {});
    }
  });

  router.post('/items', ({ body }, database) => {
    const { descriptors } = JSON.parse(body);
    const records = descriptors.map((descriptor: any) => {
      const record = database.findOne('collectionItem', {
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
    } else {
      return new Response(404, undefined, {});
    }
  });

  router.post('/file/copy/withToken', (request, database) => {
    const { body, query } = request;
    const { sourceFile } = JSON.parse(body);
    const {
      collection: destinationCollection,
      replaceFileId = uuid(),
      occurrenceKey = uuid(),
    } = query;

    const sourceRecord = database.findOne('collectionItem', {
      id: sourceFile.id,
      collectionName: sourceFile.collection,
    });

    const { details, blob } = sourceRecord.data;

    const record = database.push('collectionItem', {
      id: replaceFileId,
      insertedAt: Date.now(),
      occurrenceKey,
      details,
      blob,
      collectionName: destinationCollection,
    });

    return {
      data: record.data,
    };
  });

  router.post('/upload/createWithFiles', ({ body }, database) => {
    const { descriptors } = JSON.parse(body);
    const descriptor: TouchFileDescriptor = descriptors[0];
    database.push(
      'collectionItem',
      createCollectionItem({
        id: descriptor.fileId,
        collectionName: descriptor.collection,
        occurrenceKey: descriptor.occurrenceKey,
      }),
    );

    const uploadRecord = createUpload();
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
