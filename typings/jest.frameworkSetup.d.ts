declare namespace jest {
  interface Matchers<R> {
    /**
     * Compare two ProseMirror Node objects (documents) for equality.
     * Two documents are equal if they have the same JSON representation (same structure of nodes and marks)
     */
    toEqualDocument(expected: any): R;
    toMatchDocSnapshot(): R;
    toMatchProdImageSnapshot(): R;
  }
}
