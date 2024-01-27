import random

total_prompts = 100
total_videos = 40
total_baselines = 7


total_prompts = 50
total_videos = 40
total_baselines = 4
random_baselines = []
random_prompts = []
random_orders = []
seeds = [0,1,2,3,4,5,6,7,8,9,10]
prompts_array = [i for i in range(total_prompts)]

for seed in seeds:
    random.seed(seed)
    random_baselines.append([random.randint(0, total_baselines-1) for _ in range(total_videos)])
    random_prompts.append(random.sample(prompts_array, total_videos))
    random_orders.append([random.randint(0, 1) for _ in range(total_videos)])

print(f"random_baselines = {random_baselines}")
print(f"random_prompts = {random_prompts}")
print(f"random_orders = {random_orders}")
