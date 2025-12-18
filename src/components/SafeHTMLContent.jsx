"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

/**
 * SafeHTMLContent - ULTIMATE VERSION
 * 
 * Fixes Quill's weird list structure where all items are in <ol>
 * but separated by data-list="bullet" or data-list="ordered"
 */
export default function SafeHTMLContent({ htmlContent, className = "" }) {
  const processedContent = useMemo(() => {
    if (!htmlContent || typeof window === 'undefined') return htmlContent;

    // Step 1: Sanitize
    const sanitized = DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        "p", "br", "strong", "em", "u", "s",
        "h1", "h2", "h3", "h4", "h5", "h6",
        "ul", "ol", "li",
        "blockquote", "pre", "code",
        "a", "img", "video", "iframe",
        "sub", "sup", "div", "span", "hr",
      ],
      ALLOWED_ATTR: [
        "href", "target", "rel", "src", "alt",
        "width", "height", "class", "style",
        "data-list", "contenteditable",
      ],
      ALLOWED_STYLES: {
        "*": {
          color: [/.*/],
          "background-color": [/.*/],
          "text-align": [/.*/],
        },
      },
    });

    // Step 2: Transform Quill list structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitized;

    // Find and fix all list containers
    const lists = tempDiv.querySelectorAll('ol, ul');
    
    lists.forEach(list => {
      const items = Array.from(list.querySelectorAll('li'));
      
      if (items.length === 0) return;

      // Check if this is a Quill-generated list (has data-list attributes)
      const hasDataList = items.some(item => item.hasAttribute('data-list'));
      
      if (!hasDataList) return; // Already proper HTML

      // Group consecutive items by type
      const groups = [];
      let currentType = null;
      let currentItems = [];

      items.forEach(item => {
        const type = item.getAttribute('data-list') || 'ordered';
        
        if (type !== currentType) {
          if (currentItems.length > 0) {
            groups.push({ type: currentType, items: currentItems });
          }
          currentType = type;
          currentItems = [item];
        } else {
          currentItems.push(item);
        }
      });

      // Push last group
      if (currentItems.length > 0) {
        groups.push({ type: currentType, items: currentItems });
      }

      // Create new proper lists
      const fragment = document.createDocumentFragment();

      groups.forEach(group => {
        const newList = document.createElement(
          group.type === 'bullet' ? 'ul' : 'ol'
        );

        group.items.forEach(item => {
          const newLi = document.createElement('li');
          
          // Remove ql-ui spans and copy content
          Array.from(item.childNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && 
                node.classList?.contains('ql-ui')) {
              return; // Skip Quill UI elements
            }
            newLi.appendChild(node.cloneNode(true));
          });

          // Handle indentation
          const indentClass = Array.from(item.classList || [])
            .find(c => c.startsWith('ql-indent-'));
          
          if (indentClass) {
            const level = parseInt(indentClass.replace('ql-indent-', ''));
            newLi.style.marginLeft = `${level * 1.5}rem`;
          }

          // Copy inline styles (colors, etc)
          if (item.hasAttribute('style')) {
            const existingStyle = newLi.getAttribute('style') || '';
            newLi.setAttribute('style', existingStyle + item.getAttribute('style'));
          }

          newList.appendChild(newLi);
        });

        fragment.appendChild(newList);
      });

      // Replace old list with new structure
      list.replaceWith(fragment);
    });

    return tempDiv.innerHTML;
  }, [htmlContent]);

  if (!processedContent) {
    return (
      <div className="text-gray-400 italic text-center py-8">
        Tidak ada konten untuk ditampilkan
      </div>
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: processedContent }}
      className={`
        prose 
        prose-sm sm:prose-base lg:prose-lg 
        max-w-none
        
        /* Headings */
        prose-headings:text-[#004FC0] 
        prose-headings:font-bold 
        prose-headings:mb-3 
        prose-headings:mt-4 
        first:prose-headings:mt-0
        
        /* Paragraphs */
        prose-p:text-gray-700 
        prose-p:leading-relaxed 
        prose-p:mb-3 
        prose-p:text-sm sm:prose-p:text-base
        
        /* Lists - Will be proper <ul> and <ol> now */
        prose-ul:list-disc
        prose-ul:pl-6
        prose-ul:my-3
        prose-ul:space-y-2
        
        prose-ol:list-decimal
        prose-ol:pl-6
        prose-ol:my-3
        prose-ol:space-y-2
        
        prose-li:text-gray-700 
        prose-li:leading-relaxed 
        prose-li:text-sm 
        sm:prose-li:text-base
        
        /* Text styling */
        prose-strong:text-[#004FC0] 
        prose-strong:font-semibold
        prose-em:italic
        
        /* Links */
        prose-a:text-[#FFA80F] 
        prose-a:no-underline 
        hover:prose-a:underline
        
        /* Images */
        prose-img:rounded-xl 
        prose-img:shadow-md 
        prose-img:my-4
        
        /* Blockquote */
        prose-blockquote:border-l-4
        prose-blockquote:border-[#004FC0]
        prose-blockquote:pl-4
        prose-blockquote:italic
        prose-blockquote:text-gray-600
        prose-blockquote:my-4
        
        /* Code */
        prose-code:bg-gray-100
        prose-code:px-2
        prose-code:py-1
        prose-code:rounded
        prose-code:text-sm
        prose-code:font-mono
        prose-code:text-red-600
        prose-code:before:content-none
        prose-code:after:content-none
        
        prose-pre:bg-gray-900
        prose-pre:text-gray-100
        prose-pre:p-4
        prose-pre:rounded-lg
        prose-pre:overflow-x-auto
        prose-pre:my-4
        
        /* Break words */
        [&>*]:break-words
        
        ${className}
      `}
    />
  );
}