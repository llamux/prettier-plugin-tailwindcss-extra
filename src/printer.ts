import { AstPath, Options, ParserOptions, doc } from "prettier";
import { AstNode, classAttrRegex } from "./parser";

export function print(
  path: AstPath<AstNode>,
  _: ParserOptions<AstNode>,
  print: (path: AstPath<AstNode>) => doc.builders.Doc,
) {
  const node = path.getNode();
  if (!node) return "";

  switch (node.type) {
    case "Block":
      return doc.builders.group(path.map(print, "children"));
    case "Code":
    case "ClassAttr":
      return node.text;
  }
}

export function embed(path: AstPath<AstNode>, _: Options) {
  const node = path.getNode();
  if (!node || node.type !== "ClassAttr") return null;

  return async (
    textToDoc: (text: string, options: Options) => Promise<doc.builders.Doc>,
  ) => {
    const html = `<p ${node.text}></p>`;
    const htmlDoc = await textToDoc(html, { parser: "html" });

    let classAttr = null as string | null;

    doc.utils.traverseDoc(htmlDoc, (d) => {
      if (classAttr !== null || typeof d !== "string") return;

      const classAttrMatch = d.match(classAttrRegex);
      if (!classAttrMatch) return;

      classAttr = classAttrMatch[0];
    });

    return classAttr;
  };
}
