import sentenceCase from 'sentence-case';
import { Directory, File } from '../types';

export function getDirectories(
  items: Array<Directory | File>,
): Array<Directory> {
  const dirs: Array<Directory> = [];

  for (const item of items) {
    if (item.type === 'dir') {
      dirs.push(item);
    }
  }

  return dirs;
}

export function getFiles(items: Array<Directory | File>): Array<File> {
  const files: Array<File> = [];

  for (const item of items) {
    if (item.type === 'file') {
      files.push(item);
    }
  }

  return files;
}

export function maybeGetById<T extends { id: string }>(
  items: Array<T>,
  id: string,
): T | null {
  return items.find(item => item.id === id) || null;
}

export function getById<T extends { id: string }>(
  items: Array<T>,
  id: string,
): T {
  const match = maybeGetById(items, id);

  if (!match) {
    throw new Error(`Missing ${id} in file system`);
  }

  return match;
}

export function flatMap<T>(
  dir: Directory,
  iteratee: (file: File, filePath: string) => T,
): Array<T> {
  const result: Array<T> = [];

  function visit(dir, filePath) {
    for (const item of dir.children) {
      const currPath = `${filePath}/${item.id}`;
      if (item.type === 'dir') {
        visit(item, currPath);
      } else {
        result.push(iteratee(item, currPath));
      }
    }
  }

  visit(dir, dir.id);

  return result;
}

export function find(
  dir: Directory,
  iteratee: (file: File | Directory, filePath: string) => boolean,
): File | Directory | null {
  function visit(dir, filePath) {
    for (const item of dir.children) {
      const currPath = `${filePath}/${item.id}`;
      if (iteratee(item, currPath)) {
        return item;
      } else if (item.type === 'dir') {
        const result = visit(item, currPath);
        if (result) return result;
      }
    }
  }

  return visit(dir, dir.id) || null;
}

export function findNormalized(
  dir: Directory,
  filePath: string,
): Directory | File | null {
  return find(dir, (file, currPath) => {
    return normalize(currPath) === filePath;
  });
}

export function findNormalizedDir(
  dir: Directory,
  filePath: string,
): Directory | null {
  let dir2 = find(dir, (file, currPath) => {
    return normalize(currPath) === filePath;
  });
  if (dir2 && dir2.type !== 'dir') return null;
  else return dir2 as Directory;
}

export function normalize(filePath: string): string {
  return filePath
    .split('/')
    .map(part => {
      return part.replace(/^[\d]+-/, '');
    })
    .join('/')
    .replace(/\..*/, '');
}

export function titleize(filePath: string): string {
  return sentenceCase(normalize(filePath));
}

export function isFile(file): file is File {
  return file && file.contents;
}

export function isChildren(file): file is File {
  return file && file.children;
}
