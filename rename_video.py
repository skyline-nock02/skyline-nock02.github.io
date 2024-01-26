import glob
import os
import json
from moviepy.editor import VideoFileClip
folder = 'assets/'
prompt_mapping = {}
for method_folder in glob.glob(os.path.join(folder, '*')):
    method_name = os.path.basename(method_folder)
    # print(method_name)
    # print(os.path.join(method_folder, "*.mp4"))
    # r_prob = []
    prompt_mapping[method_name] = {}
    for video_file in sorted(glob.glob(os.path.join(method_folder, "*.mp4"))):
        # prompt_text = os.path.basename(video_file).split('__')[0].replace('_', ' ')
        task_id = os.path.basename(video_file).split('__')[1].replace('.mp4', '')
        # prompt_mapping[method_name][prompt_text] = task_id

        video = VideoFileClip(video_file)
        video = video.crop(x1=0, y1=0, width=video.h, height=video.h)
        video.write_videofile(video_file, verbose=False)
        
        os.rename(video_file, video_file.replace('__' + task_id, ''))

# print(prompt_mapping.keys())

# json_file = 'prompt_mapping.json'
# with open(json_file, 'w') as json_file:
#     json.dump(prompt_mapping, json_file, indent=2)
