/**
 * Safe frontmatter parser without eval()
 * Replaces gray-matter for security
 */

interface FrontmatterResult {
  data: Record<string, unknown>;
  content: string;
}

export function parseFrontmatter(fileContent: string): FrontmatterResult {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return {
      data: {},
      content: fileContent,
    };
  }

  const [, frontmatterString, content] = match;
  
  // Parse YAML-like frontmatter safely
  const data: Record<string, unknown> = {};
  
  frontmatterString.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex > 0) {
        const key = trimmedLine.slice(0, colonIndex).trim();
        let value = trimmedLine.slice(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Parse arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayContent = value.slice(1, -1);
          data[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
        }
        // Parse booleans
        else if (value === 'true' || value === 'false') {
          data[key] = value === 'true';
        }
        // Parse numbers
        else if (!isNaN(Number(value)) && value !== '') {
          data[key] = Number(value);
        }
        // Keep as string
        else {
          data[key] = value;
        }
      }
    }
  });

  return {
    data,
    content: content.trim(),
  };
}

// Utility function to generate frontmatter
export function stringifyFrontmatter(data: Record<string, unknown>, content: string): string {
  const frontmatterLines = Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
    } else if (typeof value === 'string') {
      return `${key}: "${value}"`;
    } else {
      return `${key}: ${value}`;
    }
  });

  return `---\n${frontmatterLines.join('\n')}\n---\n\n${content}`;
}