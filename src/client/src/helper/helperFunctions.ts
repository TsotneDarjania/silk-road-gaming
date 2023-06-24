export function generateIdToCorrectFormat(id: string) {
  id = id.replaceAll("`", "_");
  id = id.replaceAll(" ", "");
  return id;
}
