import hljs from "highlight.js";
// 官网提供多种高亮代码主题（https://highlightjs.org/static/demo/）

/**
 * @param {String} content 代码内容
 * @param {String} lang 代码语言
 * @returns table标签及内容
 */
export const lineNumbers = (content, lang) => {
  if (!content) {
    return "";
  }
  // 验证当前语言是否存在
  const language = hljs.getLanguage(lang) ? lang : "plaintext";
  // 使代码转换成带有标签的节点
  const textHtml = hljs.highlight(content, { language }).value;
  // 如果不想添加行号可以直接
  // return textHtml;

  if (!Array.isArray(content)) {
    // 返回分割后的数组
    content = getLines(textHtml);
  }

  // 自定义代码块的标签节点
  let html = "";
  for (var i = 0, l = content.length; i < l; i++) {
    let text = content[i].length > 0 ? content[i] : " ";
    html += `<tr>
                <td class="blob-num" data-line-number="${i}"></td>
                <td class="blob-code blob-code-inner">${text}</td>
              </tr>`;
  }

  return `<table class="highlight">${html}</table>`;
};

// 根据换行符或回车分割成字符串数组
export const getLines = (text) => {
  if (text.length === 0) return [];
  return text.split(/\r\n|\r|\n/g);
};
