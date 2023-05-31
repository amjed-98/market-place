import htmlParser, { type HTMLReactParserOptions } from 'html-react-parser';

function parseHtml(html: string, options?: HTMLReactParserOptions) {
  return htmlParser(html, options);
}

export default parseHtml;
