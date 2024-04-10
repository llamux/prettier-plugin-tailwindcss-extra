import { Parser, Printer, SupportLanguage } from "prettier";
import { AstNode, parse, locStart, locEnd } from "./parser";
import { print, embed } from "./printer";

const NAME = "tailwindcss-extra";

export const languages: SupportLanguage[] = [
  {
    name: "templ-tailwindcss",
    parsers: [NAME],
    extensions: [".templ"],
    vscodeLanguageIds: ["templ"],
  },
];

export const parsers = {
  [NAME]: <Parser<AstNode>>{
    astFormat: NAME,
    parse,
    locStart,
    locEnd,
  },
};

export const printers = {
  [NAME]: <Printer<AstNode>>{
    print,
    embed,
  },
};
