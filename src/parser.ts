interface BaseNode {
  index: number;
  length: number;
}

interface BlockNode extends BaseNode {
  type: "Block";
  children: AstNode[];
}

interface CodeNode extends BaseNode {
  type: "Code";
  text: string;
}

interface ClassAttrNode extends BaseNode {
  type: "ClassAttr";
  text: string;
}

export type AstNode = BlockNode | CodeNode | ClassAttrNode;

export const classAttrRegex =
  /class="[^"\\]*(?:\\.[^"\\]*)*"|class='[^'\\]*(?:\\.[^'\\]*)*'/g;

export function parse(text: string, _: object): AstNode {
  const classAttrMatches = text.matchAll(classAttrRegex);

  return text.split(classAttrRegex).reduce(
    (acc, code) => {
      const idx =
        acc.children.length === 0
          ? 0
          : (() => {
              const lastChild = acc.children.at(-1)!;
              return lastChild.index + lastChild.length;
            })();

      const codeNode: CodeNode = {
        type: "Code",
        text: code,
        index: idx,
        length: code.length,
      };

      acc.children.push(codeNode);

      const classAttr = classAttrMatches.next();
      if (classAttr.done) return acc;

      const classAttrNode: ClassAttrNode = {
        type: "ClassAttr",
        text: classAttr.value[0],
        index: idx + code.length,
        length: classAttr.value[0].length,
      };

      acc.children.push(classAttrNode);

      return acc;
    },
    <BlockNode>{
      type: "Block",
      children: [],
      index: 0,
      length: text.length,
    },
  );
}

export function locStart(node: AstNode) {
  return node.index;
}

export function locEnd(node: AstNode) {
  return node.index + node.length;
}
