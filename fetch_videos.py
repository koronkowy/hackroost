import json
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor

def get_top_video(channel_url):
    try:
        cmd = ['yt-dlp', '--dump-json', '--max-downloads', '1', '--flat-playlist', f'{channel_url}/videos']
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode == 0 and result.stdout:
            data = json.loads(result.stdout.split('\n')[0])
            if 'id' in data:
                return data['id']
    except Exception as e:
        print(f"Error for {channel_url}: {e}")
    return None

def process_channel(channel):
    if 'videoId' not in channel or not channel['videoId']:
        print(f"Fetching for {channel['name']}...")
        video_id = get_top_video(channel['url'])
        if video_id:
            channel['videoId'] = video_id
            print(f"Found {video_id} for {channel['name']}")
        else:
            print(f"Failed to find video for {channel['name']}")
    return channel

def main():
    with open('channels.json', 'r') as f:
        channels = json.load(f)

    # Use ThreadPoolExecutor to speed up fetching
    with ThreadPoolExecutor(max_workers=10) as executor:
        updated_channels = list(executor.map(process_channel, channels))

    with open('channels.json', 'w') as f:
        json.dump(updated_channels, f, indent=4)

    print("Done fetching video IDs!")

if __name__ == "__main__":
    main()
