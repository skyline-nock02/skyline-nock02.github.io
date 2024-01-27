import random

# total_prompts = 100
# total_baselines = 7

total_prompts = 50
total_baselines = 4

# total_videos = 40
# random_baselines = []
# random_prompts = []
# random_orders = []
# # seeds = [0,1,2,3,4,5,6,7,8,9,10]
# seeds = [i for i in range(40)]
# prompts_array = [i for i in range(total_prompts)]

# for seed in seeds:
#     random.seed(seed)
#     random_baselines.append([random.randint(0, total_baselines-1) for _ in range(total_videos)])
#     random_prompts.append(random.sample(prompts_array, total_videos))
#     random_orders.append([random.randint(0, 1) for _ in range(total_videos)])

# baseline_count = [[0 for _ in range(total_baselines)] for _ in range(total_prompts)]

# for seed in seeds:
#     for random_baseline, random_prompt in zip(random_baselines[seed], random_prompts[seed]):
#         baseline_count[random_prompt][random_baseline] += 1

# import numpy as np
# print(np.array(baseline_count))


# # print(f"random_baselines = {random_baselines}")
# # print(f"random_prompts = {random_prompts}")
# # print(f"random_orders = {random_orders}")



total_variants = total_prompts * total_baselines
per_variant_count = 3
total_people = 40

prompt_baseline_combination = []
for prompt in range(total_prompts):
    for baseline in range(total_baselines):
        prompt_baseline_combination.append(str(prompt) + '_' + str(baseline))

prompt_baseline_combination = prompt_baseline_combination * per_variant_count

random.seed(0)
random.shuffle(prompt_baseline_combination)

import math
per_people_video = math.ceil(len(prompt_baseline_combination) / total_people)
prompt_baseline_final_cut = []

for people_ind in range(total_people):
    prompt_baseline_final_cut.append(prompt_baseline_combination[people_ind*per_people_video:(people_ind+1)*per_people_video])


random_baselines = []
random_prompts = []
random_orders = []

for prompt_baseline_final_cut_per_entry in prompt_baseline_final_cut:
    random_baseline = []
    random_prompt = []
    random_order = []
    for item in prompt_baseline_final_cut_per_entry:
        which_prompt = int(item.split('_')[0])
        which_baseline = int(item.split('_')[1])
        random_baseline.append(which_baseline)
        random_prompt.append(which_prompt)
        random_order.append(random.randint(0, 1))
    random_baselines.append(random_baseline)
    random_prompts.append(random_prompt)
    random_orders.append(random_order)

print(f"random_baselines = {random_baselines}")
print(f"random_prompts = {random_prompts}")
print(f"random_orders = {random_orders}")

# baseline_count = [[0 for _ in range(total_baselines)] for _ in range(total_prompts)]
# for people_ind in range(total_people):
#     print(len(random_baselines[people_ind]))
#     for random_baseline, random_prompt in zip(random_baselines[people_ind], random_prompts[people_ind]):
#         baseline_count[random_prompt][random_baseline] += 1

# # import numpy as np
# # print(np.array(baseline_count))