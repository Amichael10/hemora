import pandas as pd
import json
import os

file_path = r"c:\Users\User\Monorepo\hemora\apps\web\public\hemora-blog-content.xlsx"

try:
    df = pd.read_excel(file_path)
    print("Columns found:", df.columns.tolist())
    
    # Convert to list of dicts
    posts = df.to_dict(orient='records')
    
    # Save to scratch
    output_path = r"c:\Users\User\Monorepo\hemora\scratch\blog_posts.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully extracted {len(posts)} posts to {output_path}")
    
    # Check for missing cover images
    missing_images = []
    for i, post in enumerate(posts):
        title = post.get('title', f'Untitled {i}')
        cover = post.get('cover_url')
        if not cover or pd.isna(cover):
            missing_images.append(title)
            
    if missing_images:
        print("\nPosts missing cover images:")
        for title in missing_images:
            print(f"- {title}")
    else:
        print("\nAll posts have cover images.")

except Exception as e:
    print(f"Error reading Excel: {e}")
