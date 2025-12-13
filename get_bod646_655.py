import re
import sys
from datetime import datetime

# 1. Load content
try:
    with open('extract/posts_1.html', 'r', encoding='utf-8') as f:
        content = f.read()
    with open('extract/correct_links.html', 'r', encoding='utf-8') as f:
        links_content = f.read()
except FileNotFoundError:
    print('Error: Input files not found')
    sys.exit(1)

# 2. Find all posts and sort by date
date_pattern = re.compile(r'([A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{2} [ap]m)')
matches = []
for m in date_pattern.finditer(content):
    date_str = m.group(1)
    try:
        dt = datetime.strptime(date_str, '%b %d, %Y %I:%M %p')
        matches.append({'date': dt, 'str': date_str, 'end_pos': m.start()})
    except ValueError:
        pass

matches.sort(key=lambda x: x['date'])

# 3. Find posts starting from Jun 13, 2024
start_date = datetime(2024, 6, 13) # Start from BOD645 date
start_index = -1

for i, m in enumerate(matches):
    if m['date'] >= start_date:
        start_index = i
        break

found_posts = []

if start_index != -1:
    # Get next 10 posts. Start from 1 to skip BOD645
    for i in range(1, 11): 
        if start_index + i < len(matches):
            post_match = matches[start_index + i]
            

            
            # Extract HTML
            end_pos = post_match['end_pos']
            start_search = max(0, end_pos - 15000)
            chunk = content[start_search:end_pos + 50]
            parts = chunk.split('<div class="pam _3-95 _2ph- _a6-g uiBoxWhite noborder">')
            if len(parts) >= 2:
                post_html = parts[-1]
            else:
                continue

            # Extract Caption
            caption = ''
            cap_match = re.search(r'<h2[^>]*>(.*?)</h2>', post_html, re.DOTALL)
            if cap_match:
                caption = re.sub(r'<[^>]+>', '', cap_match.group(1)).strip()

            # Extract Images
            images = re.findall(r'src="media/([^"]+)"', post_html)
            images = list(dict.fromkeys(images))

            # Find Link
            link = 'Link not found'
            clean_cap = re.sub(r'\s+', ' ', caption).strip()
            
            search_terms = []
            if len(clean_cap) > 20:
                search_terms.append(clean_cap[:40])
                if len(clean_cap) > 60:
                    search_terms.append(clean_cap[20:60])
            else:
                search_terms.append(clean_cap)
            
            for term in search_terms:
                if not term: continue
                link_pos = links_content.find(term)
                if link_pos != -1:
                    pre_text = links_content[max(0, link_pos-4000):link_pos]
                    hrefs = re.findall(r'href="(https://www.instagram.com/bebiodicionario/p/[^"]+)"', pre_text)
                    if hrefs:
                        link = hrefs[-1]
                        break
            
            found_posts.append({
                'id': f'BOD{645+i}', # Indexing relative to start_index + i (where i starts at 1)
                'date': post_match['str'],
                'caption': caption,
                'images': images,
                'link': link
            })

for p in found_posts:
    print(f"--- {p['id']} ---")
    print(f"Date: {p['date']}")
    print(f"Caption: {p['caption']}")
    print(f"Images: {p['images']}")
    print(f"Link: {p['link']}")
    print()
