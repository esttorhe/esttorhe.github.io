// ABOUTME: Fetches and parses Goodreads RSS feed for audiobooks
// ABOUTME: Used by the media page to display reading activity

export interface GoodreadsBook {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  userRating: number;
  averageRating: number;
  dateRead: string | null;
  dateAdded: string;
  numPages: number | null;
  shelves: string[];
}

const GOODREADS_USER_ID = '6006262';
const GOODREADS_RSS_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`;

export async function fetchGoodreadsShelf(shelf: string = 'read'): Promise<GoodreadsBook[]> {
  try {
    const response = await fetch(`${GOODREADS_RSS_URL}?shelf=${shelf}`);
    if (!response.ok) {
      console.error(`Failed to fetch Goodreads RSS: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    return parseGoodreadsRSS(xml);
  } catch (error) {
    console.error('Error fetching Goodreads RSS:', error);
    return [];
  }
}

function parseGoodreadsRSS(xml: string): GoodreadsBook[] {
  const books: GoodreadsBook[] = [];

  // Extract all <item> elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const book: GoodreadsBook = {
      id: extractTag(itemXml, 'book_id') || '',
      title: cleanTitle(extractTag(itemXml, 'title') || ''),
      author: extractTag(itemXml, 'author_name') || '',
      imageUrl: extractTag(itemXml, 'book_large_image_url') || extractTag(itemXml, 'book_image_url') || '',
      link: extractTag(itemXml, 'link') || '',
      userRating: parseInt(extractTag(itemXml, 'user_rating') || '0', 10),
      averageRating: parseFloat(extractTag(itemXml, 'average_rating') || '0'),
      dateRead: extractTag(itemXml, 'user_read_at') || null,
      dateAdded: extractTag(itemXml, 'user_date_added') || '',
      numPages: parseInt(extractTag(itemXml, 'num_pages') || '0', 10) || null,
      shelves: (extractTag(itemXml, 'user_shelves') || '').split(',').map(s => s.trim()).filter(Boolean),
    };

    if (book.id && book.title) {
      books.push(book);
    }
  }

  return books;
}

function extractTag(xml: string, tagName: string): string | null {
  // Handle CDATA sections
  const cdataRegex = new RegExp(`<${tagName}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }

  // Handle regular tags
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function cleanTitle(title: string): string {
  // Remove series info in parentheses if present, e.g., "Book Title (Series Name, #1)"
  return title.replace(/\s*\([^)]*#\d+[^)]*\)\s*$/, '').trim();
}

export async function fetchCurrentlyReading(): Promise<GoodreadsBook[]> {
  return fetchGoodreadsShelf('currently-reading');
}

export async function fetchReadBooks(): Promise<GoodreadsBook[]> {
  return fetchGoodreadsShelf('read');
}
