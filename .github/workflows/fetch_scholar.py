#!/usr/bin/env python3
"""
Fetch latest publications from Google Scholar and update both news.json and publications.json
"""

import json
import os
from datetime import datetime
from scholarly import scholarly, ProxyGenerator

def load_existing_news():
    """Load existing news from JSON file"""
    try:
        with open('data/news.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"news": [], "last_updated": None, "scholar_id": ""}

def fetch_scholar_publications(scholar_id):
    """Fetch publications from Google Scholar"""
    try:
        # Set up proxy to avoid rate limiting (optional)
        # pg = ProxyGenerator()
        # pg.FreeProxies()
        # scholarly.use_proxy(pg)
        
        # Search for author
        author = scholarly.search_author_id(scholar_id)
        author_info = scholarly.fill(author)
        
        # Get publications
        publications = []
        for pub in author_info['publications'][:10]:  # Get latest 10
            pub_filled = scholarly.fill(pub)
            
            pub_data = {
                'title': pub_filled['bib']['title'],
                'year': pub_filled['bib'].get('pub_year', 'N/A'),
                'venue': pub_filled['bib'].get('venue', 'N/A'),
                'authors': pub_filled['bib'].get('author', 'N/A'),
                'citations': pub_filled.get('num_citations', 0),
                'url': pub_filled.get('pub_url', '')
            }
            publications.append(pub_data)
            
        return publications
        
    except Exception as e:
        print(f"Error fetching from Scholar: {e}")
        return []

def create_news_item(pub):
    """Convert publication to news item format"""
    # Estimate date from year (you can improve this)
    year = pub.get('year', datetime.now().year)
    date = f"{year}-01-01"
    
    return {
        "date": date,
        "title": f"New publication: {pub['title']}",
        "description": f"Published in {pub['venue']}. Citations: {pub['citations']}",
        "type": "publication",
        "link": pub.get('url', '')
    }

def merge_news(existing_data, new_publications):
    """Merge new publications with existing news"""
    existing_news = existing_data.get('news', [])
    
    # Get titles of existing publications to avoid duplicates
    existing_titles = {item['title'] for item in existing_news}
    
    # Add new publications
    new_items = []
    for pub in new_publications:
        news_item = create_news_item(pub)
        if news_item['title'] not in existing_titles:
            new_items.append(news_item)
    
    # Combine and sort by date (newest first)
    all_news = new_items + existing_news
    all_news.sort(key=lambda x: x['date'], reverse=True)
    
    # Limit to 50 most recent items
    return all_news[:50]

def main():
    # Get Scholar ID from environment variable
    scholar_id = os.environ.get('SCHOLAR_ID')
    
    if not scholar_id:
        print("Error: SCHOLAR_ID not set")
        return
    
    print(f"Fetching publications for Scholar ID: {scholar_id}")
    
    # Load existing data
    existing_data = load_existing_news()
    
    # Fetch new publications
    publications = fetch_scholar_publications(scholar_id)
    
    if not publications:
        print("No publications fetched. Using existing data.")
        return
    
    print(f"Found {len(publications)} publications")
    
    # Merge with existing news
    updated_news = merge_news(existing_data, publications)
    
    # Update data
    output_data = {
        "news": updated_news,
        "last_updated": datetime.now().isoformat(),
        "scholar_id": scholar_id
    }
    
    # Save to file
    with open('data/news.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"Successfully updated news.json with {len(updated_news)} total items")

if __name__ == '__main__':
    main()